import React, { useState, useEffect, useMemo } from 'react'
import { listarEduinos } from '../../../services/SEduinos'
import { listarComidaNene, darComida } from '../../../services/SEduinos'

import './CPEduinos.css'
export default function CPEduinos({irA, setEduinoParaVender}) {

  const id_nene = sessionStorage.getItem('id_nene')
  const [eduinos, setEduinos] = useState([])
  const [eduinoSeleccionado, setEduinoSeleccionado] = useState(null)
  const [datosComida, setDatosComida] = useState('datos')
  const [copiaIdx, setCopiaIdx] = useState(0)
  const [orden, setOrden] = useState('az')
  const [soloMios, setSoloMios] = useState(false)
  const [tipoFiltro, setTipoFiltro] = useState(null)
  const [almacenComida, setAlmacenComida] = useState([])

  const tiposDisponibles = useMemo(() =>
    [...new Set(eduinos.map(e => e.tipo).filter(t => t && t !== '???'))].sort()
  , [eduinos])

  
  useEffect(() => {
    listarEduinos(id_nene).then(data => setEduinos(data))
  }, [])

  useEffect(() => {
    listarComidaNene(id_nene).then(data => setAlmacenComida(data))
  }, [])

  const copia = eduinoSeleccionado?.copias[copiaIdx] ?? null
  const totalCopias = eduinoSeleccionado?.copias.length ?? 0

  const eduinosMostrados = useMemo(() => {
    let lista = soloMios ? eduinos.filter(e => e.desbloqueado) : [...eduinos]
    if (tipoFiltro) lista = lista.filter(e => e.tipo === tipoFiltro)
    switch (orden) {
      case 'az':
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case 'nivel':
        lista.sort((a, b) => {
          const nA = a.copias.length ? Math.max(...a.copias.map(c => c.nivel)) : -1
          const nB = b.copias.length ? Math.max(...b.copias.map(c => c.nivel)) : -1
          return nB - nA
        })
        break
      case 'cantidad':
        lista.sort((a, b) => b.copias.length - a.copias.length)
        break
    }
    return lista
  }, [eduinos, orden, soloMios, tipoFiltro])

  async function handleDarComida(comida) {
    const res = await darComida(id_nene, comida, eduinoSeleccionado, copiaIdx)
    if (!res?.data?.ok) return

    const { nivel, porcentaje, vida_actual, fuerza_actual } = res.data

    setAlmacenComida(prev =>
      prev.map(c => c.id_comida === comida.id_comida ? { ...c, cantidad: c.cantidad - 1 } : c)
        .filter(c => c.cantidad > 0)
    )

    const actualizarCopias = copias =>
      copias.map((c, i) => i === copiaIdx ? { ...c, nivel, porcentaje, vida_actual, fuerza_actual } : c)

    setEduinoSeleccionado(prev => ({ ...prev, copias: actualizarCopias(prev.copias) }))
    setEduinos(prev =>
      prev.map(e => e.id_eduino === eduinoSeleccionado.id_eduino
        ? { ...e, copias: actualizarCopias(e.copias) }
        : e
      )
    )
  }

  function abrirEduino(e) {
    setEduinoSeleccionado(e)
    setCopiaIdx(0)
    setDatosComida('datos')
  }

  return (
    <>
      <div className='CPEduinos-contenedordeEduinosGeneral'>
        <div className='CPEduinos-contenedorBotonesOrdenar'>
          <div className='CPEduinos-barraFiltros'>
            <div className='CPEduinos-grupoFiltro'>
              <span className='CPEduinos-filtroLabel'>Ordenar</span>
              <div className='CPEduinos-pils'>
                <button className={`CPEduinos-pil ${orden === 'az' ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setOrden('az')}>A — Z</button>
                <button className={`CPEduinos-pil ${orden === 'nivel' ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setOrden('nivel')}>Nivel</button>
                <button className={`CPEduinos-pil ${orden === 'cantidad' ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setOrden('cantidad')}>Cantidad</button>
              </div>
            </div>
            <div className='CPEduinos-filtroSep'></div>
            <div className='CPEduinos-grupoFiltro'>
              <span className='CPEduinos-filtroLabel'>Mostrar</span>
              <div className='CPEduinos-pils'>
                <button className={`CPEduinos-pil ${!soloMios ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setSoloMios(false)}>Todos</button>
                <button className={`CPEduinos-pil ${soloMios ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setSoloMios(true)}>Solo míos</button>
              </div>
            </div>
            <div className='CPEduinos-filtroSep'></div>
            <div className='CPEduinos-grupoFiltro'>
              <span className='CPEduinos-filtroLabel'>Tipo</span>
              <div className='CPEduinos-orbes'>
                <button
                  className={`CPEduinos-orbeFiltro ${tipoFiltro === null ? 'CPEduinos-orbeFiltro--activo' : ''}`}
                  onClick={() => setTipoFiltro(null)}
                  title="Todos"
                >
                  <span className='CPEduinos-orbeTodos'>
                  <img src="imagenes/eduinos/eduino_objetos/orbes/todo.png" alt="" /></span>
                </button>
                {tiposDisponibles.map(tipo => (
                  <button
                    key={tipo}
                    className={`CPEduinos-orbeFiltro ${tipoFiltro === tipo ? 'CPEduinos-orbeFiltro--activo' : ''}`}
                    onClick={() => setTipoFiltro(prev => prev === tipo ? null : tipo)}
                    title={tipo}
                  >
                    <img src={`imagenes/eduinos/eduino_objetos/orbes/${tipo}.png`} alt={tipo} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='CPEduinos-contenedorEduinos'>
          {eduinosMostrados.map(e => (
            <div className={`CPEduinos-targetaEduino ${e.desbloqueado ? '' : 'CPEduinos-bloqueado'}`} key={e.id_eduino}
              onClick={() => e.desbloqueado && abrirEduino(e)}>
              <img className='CPEduinos-imagenEduino' src={e.imagen_perfil} alt={e.nombre} />
              <p>{e.desbloqueado ? e.nombre : '???'}</p>
            </div>
          ))}
        </div>
        {eduinoSeleccionado && (
          <div className='CPEduinos-burbuja-fondo' onClick={() => setEduinoSeleccionado(null)}>
            <div className="CPEduinos-burbuja" onClick={e => e.stopPropagation()}>
              <div className="CPEduinos-burbuja-cerrar">
                <p onClick={() => setEduinoSeleccionado(null)}>✕</p>
              </div>
              <div className='CPEduinos-contenedorEdupedia'>
                <div className='CPEduinos-eduino'>
                  <div className='CPEduinos-contenedorDatosTop'>
                    <div className='CPEduinos-orbeWrapper'>
                      <img className='CPEduinos-imagenOrbe' src={`imagenes/eduinos/eduino_objetos/orbes/${eduinoSeleccionado.tipo}.png`} alt="" />
                      <span className='CPEduinos-tipoLabel'>{eduinoSeleccionado.tipo}</span>
                    </div>
                    <div className='CPEduinos-nombreWrapper'>
                      {totalCopias > 1 && (
                        <button className='CPEduinos-copiaBtn' onClick={() => setCopiaIdx(i => (i - 1 + totalCopias) % totalCopias)}>‹</button>
                      )}
                      <p className='CPEduinos-nombreEduino'>{eduinoSeleccionado.nombre}</p>
                      {totalCopias > 1 && (
                        <button className='CPEduinos-copiaBtn' onClick={() => setCopiaIdx(i => (i + 1) % totalCopias)}>›</button>
                      )}
                    </div>
                    <p className='CPEduinos-numeroEduino'>#{copia?.id_eduino_unico}</p>
                  </div>
                  <div className='CPEduinos-contenedorImagenDatos'>
                    <img className='CPEduinos-imagenEduinoCompleto' src={eduinoSeleccionado.imagen_eduino} alt="" />
                  </div>
                  <div className='CPEduinos-barraProgreso'>
                    {copia && (
                      <>
                        <p className='CPEduinos-nivelLabel'>Nv. {copia.nivel}</p>
                        <div className='CPEduinos-barra'>
                          <div className='CPEduinos-barraRelleno' style={{ width: `${copia.porcentaje}%` }} />
                        </div>
                        <p className='CPEduinos-porcentajeLabel'>{parseFloat(copia.porcentaje).toFixed(0)}%</p>
                      </>
                    )}
                  </div>
                </div>
                <div className='CPEdionos-separador'></div>
                <div className='CPEduinos-datosComida'>
                  <div className='CPEduinos-contenedorBotonesDatosComida'>
                    <p className={datosComida === 'comida' ? 'CPEduinos-tabActivo' : ''} onClick={() => setDatosComida('comida')}>Comida</p>
                    <p className={datosComida === 'datos' ? 'CPEduinos-tabActivo' : ''} onClick={() => setDatosComida('datos')}>Datos</p>
                  </div>
                  <div className={`CPEduinos-comida ${datosComida !== 'comida' ? 'CPEduinos-tabOculto' : ''}`}>
                    {almacenComida.length > 0 ? (
                      <>
                        <div className='CPEduinos-almacenComida'>
                          {almacenComida.map(comida =>(
                            <div key={comida.id_comida} className="CPEduinos-comidaTargeta" onClick={() => handleDarComida(comida)}>
                                <img src={comida.imagen_perfil} alt={comida.nombre} />
                                <span className="CPEduinos-comidaNombre">{comida.nombre}</span>
                                <span className="CPEduinos-comidaAlimentacion">+{comida.alimentacion} 🍖</span>
                                <span className="CPEduinos-comidaCantidad">x{comida.cantidad}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="CPEduinos-sinComida">No tienes comida.<br />¡Ve a la tienda!</p>
                      </>
                    )}
                  </div>
                  <div className={`CPEduinos-datos ${datosComida !== 'datos' ? 'CPEduinos-tabOculto' : ''}`}>
                    <div className='CPEduinos-contenedorTexto'>
                    <p>Descripcion</p>
                    </div>
                    <div className='CPEduinos-descripcionContenedor'>
                    <p>{eduinoSeleccionado.descripcion}</p>
                    </div>
                    <div className='CPEduinos-contenedorTexto'>
                    <p>Tipo</p>
                    </div>
                    <p className='CPEduinos-tipoBadge'>{eduinoSeleccionado.tipo}</p>
                    <div className='CPEduinos-contenedorTexto'>
                    <p>Estadisticas</p>
                    </div>
                    {(() => {
                      const vidaActual  = copia?.vida_actual ?? eduinoSeleccionado.vida
                      const vidaMax     = eduinoSeleccionado.vida + (copia?.nivel ?? 1) * Math.round(eduinoSeleccionado.vida * 0.2)
                      const fuerzaActual = copia?.fuerza_actual ?? eduinoSeleccionado.fuerza
                      const fuerzaMax   = eduinoSeleccionado.fuerza + Math.round(eduinoSeleccionado.fuerza * 0.5)
                      return (
                        <div className='CPEduinos-statsContainer'>
                          <div className='CPEduinos-statRow'>
                            <span><img className='CPEduinos-icono' src="icons/vida.png" alt="" /></span>
                            <div className='CPEduinos-statBarra'>
                              <div className='CPEduinos-statRelleno CPEduinos-statVida'
                                style={{ width: `${Math.min((vidaActual / vidaMax) * 100, 100)}%` }} />
                            </div>
                            <span>{vidaActual}/{vidaMax}</span>
                          </div>
                          <div className='CPEduinos-statRow'>
                            <span><img className='CPEduinos-icono' src="icons/fuerza.png" alt="" /></span>
                            <div className='CPEduinos-statBarra'>
                              <div className='CPEduinos-statRelleno CPEduinos-statFuerza'
                                style={{ width: `${Math.min((fuerzaActual / fuerzaMax) * 100, 100)}%` }} />
                            </div>
                            <span>{fuerzaActual}/{fuerzaMax}</span>
                          </div>
                        </div>
                      )
                    })()}
                    <div className='CPEduinos-contenedorTexto'>
                      <p>Ataques</p>
                    </div>
                    <div className='CPEduinos-ataquesContainer'>
                      <div className='CPEduinos-ataqueItem'>{eduinoSeleccionado.ataque1}</div>
                      <div className='CPEduinos-ataqueItem'>{eduinoSeleccionado.ataque2}</div>
                      <div className='CPEduinos-ataqueItem'>{eduinoSeleccionado.ataque3}</div>
                      <div className='CPEduinos-ataqueItem'>{eduinoSeleccionado.ataque4}</div>
                      <div className='CPEduinos-superAtaqueItem'>{eduinoSeleccionado.super_ataque}</div>
                    </div>
                    <div className='CPEduinos-separadorDatos'>

                    </div>
                    <div className='CPEduinos-contenedorBotonVenta'
                    onClick={() => {
                      setEduinoParaVender({ ...eduinoSeleccionado, copiaVender: copia })
                      irA('mercado')
                    }}>
                        <p>¡¡¡Vender!!!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

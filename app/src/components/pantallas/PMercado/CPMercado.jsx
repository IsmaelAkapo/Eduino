import { useState, useEffect, useCallback, useMemo } from 'react'

import { listarMercado, comprarEduino, venderEduino, recuperar as recuperarService } from '../../../services/SMercado'
import { getMonedas } from '../../../services/STienda'

import './CPMercado.css'

export default function CPMercado({ eduinoParaVender, setEduinoParaVender }) {

  const [monedas, setMonedas]         = useState(0)
  const [mercado, setMercado]         = useState([])
  const [modalEduino, setModalEduino] = useState(null)
  const [comprando, setComprando]     = useState(false)
  const [errorCompra, setErrorCompra] = useState(null)
  const [precio, setPrecio]           = useState('')
  const [enviando, setEnviando]       = useState(false)
  const [errorVenta, setErrorVenta]   = useState(null)
  const id_nene = sessionStorage.getItem('id_nene')

  const cargarDatos = useCallback(() => {
    listarMercado().then(data => setMercado(data)).catch(console.error)
    getMonedas(id_nene).then(setMonedas).catch(console.error)
  }, [id_nene])

  useEffect(() => { cargarDatos() }, [cargarDatos])


  async function confirmarCompra() {
    if (!modalEduino || comprando) return
    setComprando(true)
    setErrorCompra(null)
    try {
      await comprarEduino(id_nene, modalEduino)
      setModalEduino(null)
      cargarDatos()
    } catch (e) {
      setErrorCompra(e.message)
    } finally {
      setComprando(false)
    }
  }

  async function recuperar(eduino) {
    try {
      await recuperarService(id_nene, eduino)
      cargarDatos()
    } catch (e) {
      console.error(e)
    }
  }

  function cancelarVenta() {
    setEduinoParaVender(null)
    setPrecio('')
    setErrorVenta(null)
  }

  async function confirmarVenta() {
    if (!eduinoParaVender || enviando || !precio || Number(precio) <= 0) return
    setEnviando(true)
    setErrorVenta(null)
    try {
      await venderEduino(id_nene, eduinoParaVender, precio)
      setEduinoParaVender(null)
      setPrecio('')
      cargarDatos()
    } catch (e) {
      setErrorVenta(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <div className='CPMercado-contenedorCompleto'>

        <div className='CPMercado-contenedorEncabezadoFiltro'>
          <div className='CPMercado-contenedorMonedas'>
            <h4>{monedas}</h4>
            <img src="/imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
          </div>

          <div className='CPEduinos-contenedorBotonesOrdenar'>
            <div className='CPEduinos-barraFiltros'>
              <div className='CPEduinos-grupoFiltro'>
                <span className='CPEduinos-filtroLabel'>Ordenar</span>
                <div className='CPEduinos-pils'>
                  <button className='CPEduinos-pil'>A — Z</button>
                  <button className='CPEduinos-pil'>Precio mayor</button>
                  <button className='CPEduinos-pil'>Precio menor</button>
                </div>
              </div>
              <div className='CPEduinos-filtroSep'></div>
              <div className='CPEduinos-grupoFiltro'>
                <span className='CPEduinos-filtroLabel'>Mostrar</span>
                <div className='CPEduinos-pils'>
                  <button className='CPEduinos-pil'>Todos</button>
                  <button className='CPEduinos-pil'>Los que no tengo</button>
                  <button className='CPEduinos-pil'>Baratos</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mercado.length > 0 ? (
          <div className='CPMercado-contenedorTargetasMercado'>
            {mercado.map(eduino => (
              <div key={eduino.id_venta} className='CPMercado-targetaVenta'>
                <div>
                  <p>{eduino.nombre} Nvl.{eduino.nivel}</p>
                </div>
                <img className='CPMercado-imagenEduino' src={eduino.imagen_perfil} alt="" />
                <div className='CPMercado-contenedorPrecio'>
                  <p>{eduino.precio}</p>
                  <img className='CPMercado-icono' src="/imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
                </div>
                <div className='CPMercado-botonCompra'>
                  {Number(id_nene) === Number(eduino.id_nene) ? (
                    <p onClick={() => recuperar(eduino)}>Recuperar</p>
                  ) : (
                    <p onClick={() => setModalEduino(eduino)}>Comprar</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay nada en el mercado</p>
        )}

        {/* Modal comprar */}
        {modalEduino && (
          <div className='CPMercado-modalFondo' onClick={() => !comprando && setModalEduino(null)}>
            <div className='CPMercado-modal' onClick={e => e.stopPropagation()}>
              <img className='CPMercado-modalFotoEduino' src={modalEduino.imagen_eduino} alt={modalEduino.nombre} />
              <h2 className='CPMercado-modalNombre'>{modalEduino.nombre}</h2>
              <div className='CPMercado-modalDatos'>
                <div className='CPMercado-modalDato'>
                  <span>Nivel</span>
                  <strong>{modalEduino.nivel}</strong>
                </div>
                <div className='CPMercado-modalDato'>
                  <span>ID único</span>
                  <strong>#{modalEduino.id_eduino_unico}</strong>
                </div>
                <div className='CPMercado-modalDato'>
                  <span>Precio</span>
                  <strong className='CPMercado-modalPrecio'>
                    {modalEduino.precio}
                    <img src="/imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
                  </strong>
                </div>
              </div>
              <p className='CPMercado-modalPregunta'>¿Seguro que quieres comprarlo?</p>
              {errorCompra && <p className='CPMercado-modalError'>{errorCompra}</p>}
              <div className='CPMercado-modalBotones'>
                <button className='CPMercado-modalBotonCancelar' onClick={() => setModalEduino(null)} disabled={comprando}>
                  Cancelar
                </button>
                <button className='CPMercado-modalBotonConfirmar' onClick={confirmarCompra} disabled={comprando}>
                  {comprando ? 'Comprando...' : '¡Comprar!'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal vender */}
        {eduinoParaVender && (
          <div className='CPMercado-modalFondo' onClick={() => !enviando && cancelarVenta()}>
            <div className='CPMercado-modal' onClick={e => e.stopPropagation()}>
              <img className='CPMercado-modalFotoEduino' src={eduinoParaVender.imagen_eduino} alt={eduinoParaVender.nombre} />
              <h2 className='CPMercado-modalNombre'>{eduinoParaVender.nombre}</h2>
              <div className='CPMercado-modalDatos'>
                <div className='CPMercado-modalDato'>
                  <span>Nivel</span>
                  <strong>{eduinoParaVender.copiaVender?.nivel}</strong>
                </div>
                <div className='CPMercado-modalDato'>
                  <span>ID único</span>
                  <strong>#{eduinoParaVender.copiaVender?.id_eduino_unico}</strong>
                </div>
              </div>
              <p className='CPMercado-modalPregunta'>¿A qué precio lo pones en venta?</p>
              <div className='CPMercado-inputPrecioWrapper'>
                <input
                  className='CPMercado-inputPrecio'
                  type="number"
                  min="1"
                  placeholder="Precio en monedas"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                  disabled={enviando}
                />
                <img src="/imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
              </div>
              {errorVenta && <p className='CPMercado-modalError'>{errorVenta}</p>}
              <div className='CPMercado-modalBotones'>
                <button className='CPMercado-modalBotonCancelar' onClick={cancelarVenta} disabled={enviando}>
                  Cancelar
                </button>
                <button
                  className='CPMercado-modalBotonConfirmar'
                  onClick={confirmarVenta}
                  disabled={enviando || !precio || Number(precio) <= 0}
                >
                  {enviando ? 'Vendiendo...' : '¡Poner en venta!'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

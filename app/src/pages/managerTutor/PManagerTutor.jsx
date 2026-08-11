import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CPiePagina from '../../components/piePagina/CPiePagina'
import { listarNenes, actualizarNene } from '../../services/STutor'
import { subirFoto } from '../../services/SNenes'
import './PManagerTutor.css'

const API_BASE = 'http://localhost:8081'
const PASOS_PANTALLA = ['10min', '30min', '1h00', '1h30', '2h00', '2h30', '3h00', '3h30', 'Sin límite']
const PASOS_MINUTOS  = [10, 30, 60, 90, 120, 150, 180, 210, 1440]
const DIAS    = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const DIAS_DB = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const NIVELES = ['Infantil', 'Junior', 'Pre-adolescente']

function fotoSrc(foto) {
  if (!foto) return '/icons/sin_foto.jpg'
  if (foto.startsWith('http')) return foto
  return API_BASE + foto
}

export default function PManagerTutor() {
  const idTutor    = sessionStorage.getItem('id_tutor')
  const nombreTutor = sessionStorage.getItem('nombre_tutor')
  const navigate   = useNavigate()

  const [nenes,        setNenes]        = useState([])
  const [menuAbierto,  setMenuAbierto]  = useState(false)
  const [modoEdicion,  setModoEdicion]  = useState(false)
  const [neneEditando, setNeneEditando] = useState(null)
  const [form,         setForm]         = useState({})
  const [fotoFile,     setFotoFile]     = useState(null)
  const [fotoPreview,  setFotoPreview]  = useState(null)
  const [guardando,    setGuardando]    = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!idTutor) return
    listarNenes(idTutor).then(data => setNenes(data)).catch(console.error)
  }, [])

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAbierto(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function salir() {
    sessionStorage.clear()
    navigate('/')
  }

  function abrirEdicion(nene) {
    const pantallaIdx = PASOS_MINUTOS.indexOf(Number(nene.tiempo_pantalla))
    const diasArr = nene.dias_permitidos ? nene.dias_permitidos.split(',') : []
    setForm({
      nombre:         nene.nombre,
      apodo:          nene.apodo,
      nivel:          nene.nivel,
      pantallaIdx:    pantallaIdx >= 0 ? pantallaIdx : 4,
      horario_inicio: nene.horario_inicio?.slice(0, 5) ?? '',
      horario_fin:    nene.horario_fin?.slice(0, 5) ?? '',
      dias:           DIAS_DB.map(d => diasArr.includes(d)),
      foto:           nene.foto,
    })
    setFotoFile(null)
    setFotoPreview(null)
    setNeneEditando(nene)
  }

  function cerrarEdicion() {
    setNeneEditando(null)
    setFotoFile(null)
    setFotoPreview(null)
  }

  function toggleDia(i) {
    setForm(prev => ({ ...prev, dias: prev.dias.map((d, idx) => idx === i ? !d : d) }))
  }

  async function guardar() {
    setGuardando(true)
    try {
      let fotoRuta = form.foto
      if (fotoFile) fotoRuta = await subirFoto(fotoFile)

      const diasStr = DIAS_DB.filter((_, i) => form.dias[i]).join(',')
      await actualizarNene(neneEditando.id_nene, {
        nombre:         form.nombre,
        apodo:          form.apodo,
        foto:           fotoRuta,
        nivel:          form.nivel,
        tiempo_pantalla: PASOS_MINUTOS[form.pantallaIdx],
        horario_inicio: form.horario_inicio,
        horario_fin:    form.horario_fin,
        dias_permitidos: diasStr,
      })

      setNenes(prev => prev.map(n => n.id_nene === neneEditando.id_nene
        ? { ...n, nombre: form.nombre, apodo: form.apodo, foto: fotoRuta, nivel: form.nivel,
            tiempo_pantalla: PASOS_MINUTOS[form.pantallaIdx],
            horario_inicio: form.horario_inicio, horario_fin: form.horario_fin,
            dias_permitidos: diasStr }
        : n
      ))
      cerrarEdicion()
    } catch (e) {
      console.error(e)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <div className="PManagerTutor-ContenedorEncabezado">
        <img src="/Logo_Iconos_Eduino/Eduino_Logo_Blanco.png" alt="Logo de Eduino" />
        <div className='PManagerTutor-ContenedorBotonAjustes' ref={menuRef}>
          <img src="/icons/ajustes.png" alt="" onClick={() => setMenuAbierto(p => !p)} />
          {menuAbierto && (
            <div className='PManagerTutor-menuAjustes'>
              <button onClick={() => { setMenuAbierto(false); setModoEdicion(true) }}>Editar</button>
              <button className='PManagerTutor-menuSalir' onClick={salir}>Salir</button>
            </div>
          )}
        </div>
      </div>

      <div className='PManagerTutor-ContenedorPrincipal'>
        <h1>Hola, <span>{nombreTutor}</span> estos son tus niños a cargo</h1>

        <div className='PManagerTutor-ContenedorTargetasNenes'>
          {nenes.map(nene => {
            const edad = nene.fecha_nac
              ? Math.floor((new Date() - new Date(nene.fecha_nac)) / (365.25 * 24 * 60 * 60 * 1000))
              : '—'
            return (
              <div key={nene.id_nene} className="tarjetaNene">
                <div className='tarjetaNene-encabezado'>
                  <img src={fotoSrc(nene.foto)} alt={nene.nombre} onError={e => { e.target.src = '/icons/sin_foto.jpg' }} />
                  <p className='tarjetaNene-nombre'>{nene.nombre}</p>
                  <p className='tarjetaNene-apodo'>@{nene.apodo}</p>
                  {modoEdicion && (
                    <button className='tarjetaNene-btnEditar' onClick={() => abrirEdicion(nene)}>Editar</button>
                  )}
                </div>

                <div className='tarjetaNene-cuerpo'>
                  <div className='tarjetaNene-seccion'>
                    <p className='tarjetaNene-seccionTitulo'>Info personal</p>
                    <div className='tarjetaNene-dato'><span>Fecha nac.</span><span>{nene.fecha_nac}</span></div>
                    <div className='tarjetaNene-dato'><span>Edad</span><span>{edad} años</span></div>
                    <div className='tarjetaNene-dato'><span>Nivel</span><span>{nene.nivel}</span></div>
                  </div>
                  <div className='tarjetaNene-seccion'>
                    <p className='tarjetaNene-seccionTitulo'>Control parental</p>
                    <div className='tarjetaNene-dato'><span>Tiempo pantalla</span><span>{nene.tiempo_pantalla} min</span></div>
                    <div className='tarjetaNene-dato'><span>Horario</span><span>{nene.horario_inicio?.slice(0,5)} – {nene.horario_fin?.slice(0,5)}</span></div>
                    <div className='tarjetaNene-dato'><span>Días permitidos</span><span>{nene.dias_permitidos}</span></div>
                  </div>
                  <div className='tarjetaNene-seccion tarjetaNene-datosEstudio'>
                    <p className='tarjetaNene-seccionTitulo'>Datos de estudio</p>
                    <div className='tarjetaNene-dato'><span>Ejercicios de lengua</span><span>{nene.numero_ejercicios_lengua}</span></div>
                    <div className='tarjetaNene-dato'><span>Sopas de letras</span><span>{nene.numero_de_sopas}</span></div>
                    <div className='tarjetaNene-dato'><span>Palabras encontradas</span><span>{nene.numero_de_palabras_encontradas}</span></div>
                    <div className='tarjetaNene-dato'><span>Ejercicios de matemáticas</span><span>{nene.numero_ejercicios_matematicas}</span></div>
                    <div className='tarjetaNene-dato'><span>Operaciones</span><span>{nene.numero_de_operaciones}</span></div>
                    <div className='tarjetaNene-dato'><span>Problemas</span><span>{nene.numero_de_problemas}</span></div>
                    <div className='tarjetaNene-dato'><span>Ejercicios de geografía</span><span>{nene.numero_ejercicios_geografia}</span></div>
                    <div className='tarjetaNene-dato'><span>Capitales adivinadas</span><span>{nene.numero_capitales_adivinadas}</span></div>
                    <div className='tarjetaNene-dato'><span>Ejercicios de historia</span><span>{nene.numero_ejercicios_historia}</span></div>
                    <div className='tarjetaNene-dato'><span>Tests de historia</span><span>{nene.numero_test_historia}</span></div>
                  </div>
                  <div className='tarjetaNene-seccion tarjetaNene-monedas'>
                    <p className='tarjetaNene-seccionTitulo'>Monedas</p>
                    <div className='tarjetaNene-dato'><span>Actuales</span><span>{nene.monedas_actual} 🪙</span></div>
                    <div className='tarjetaNene-dato'><span>Total ganadas</span><span>{nene.monedas_total} 🪙</span></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal edición */}
      {neneEditando && (
        <div className='PManagerTutor-modalFondo' onClick={cerrarEdicion}>
          <div className='PManagerTutor-modal' onClick={e => e.stopPropagation()}>
            <div className='PManagerTutor-modalEncabezado'>
              <h2>Editar a <span>{neneEditando.nombre}</span></h2>
              <button className='PManagerTutor-modalCerrar' onClick={cerrarEdicion}>✕</button>
            </div>

            <div className='PManagerTutor-modalCuerpo'>

              {/* Foto */}
              <label className='PManagerTutor-fotoLabel'>
                <img
                  src={fotoPreview || fotoSrc(form.foto)}
                  alt=""
                  onError={e => { e.target.src = '/icons/sin_foto.jpg' }}
                />
                <span>Cambiar foto</span>
                <input type="file" accept="image/*" onChange={e => {
                  const f = e.target.files[0]
                  if (f) { setFotoFile(f); setFotoPreview(URL.createObjectURL(f)) }
                }} />
              </label>

              {/* Nombre */}
              <div className='PManagerTutor-campo'>
                <label>Nombre</label>
                <input type="text" value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} />
              </div>

              {/* Apodo */}
              <div className='PManagerTutor-campo'>
                <label>Apodo</label>
                <input type="text" value={form.apodo} onChange={e => setForm(p => ({ ...p, apodo: e.target.value }))} />
              </div>

              {/* Nivel */}
              <div className='PManagerTutor-campo'>
                <label>Nivel de contenido</label>
                <div className='PManagerTutor-pils'>
                  {NIVELES.map(n => (
                    <button key={n}
                      className={`PManagerTutor-pil ${form.nivel === n ? 'PManagerTutor-pil--activo' : ''}`}
                      onClick={() => setForm(p => ({ ...p, nivel: n }))}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiempo de pantalla */}
              <div className='PManagerTutor-campo'>
                <label>Tiempo de pantalla: <strong>{PASOS_PANTALLA[form.pantallaIdx]}</strong></label>
                <input type="range" min={0} max={PASOS_PANTALLA.length - 1} step={1}
                  value={form.pantallaIdx}
                  onChange={e => setForm(p => ({ ...p, pantallaIdx: Number(e.target.value) }))} />
              </div>

              {/* Horario */}
              <div className='PManagerTutor-filaHorario'>
                <div className='PManagerTutor-campo'>
                  <label>Desde</label>
                  <input type="time" value={form.horario_inicio} onChange={e => setForm(p => ({ ...p, horario_inicio: e.target.value }))} />
                </div>
                <div className='PManagerTutor-campo'>
                  <label>Hasta</label>
                  <input type="time" value={form.horario_fin} onChange={e => setForm(p => ({ ...p, horario_fin: e.target.value }))} />
                </div>
              </div>

              {/* Días */}
              <div className='PManagerTutor-campo'>
                <label>Días permitidos</label>
                <div className='PManagerTutor-dias'>
                  {DIAS.map((d, i) => (
                    <button key={d}
                      className={`PManagerTutor-dia ${form.dias?.[i] ? 'PManagerTutor-dia--activo' : ''}`}
                      onClick={() => toggleDia(i)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='PManagerTutor-modalPie'>
              <button className='PManagerTutor-btnCancelar' onClick={cerrarEdicion}>Cancelar</button>
              <button className='PManagerTutor-btnGuardar' onClick={guardar} disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <CPiePagina />
    </>
  )
}

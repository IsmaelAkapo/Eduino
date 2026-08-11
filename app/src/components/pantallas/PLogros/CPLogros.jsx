import { useState, useEffect } from 'react'
import { listarLogros, reclamarLogro } from '../../../services/SLogros'
import './CPLogros.css'

const GRUPOS = [
    { tipo: 'login',       titulo: 'Inicio de sesión' },
    { tipo: 'lengua',      titulo: 'Lengua'            },
    { tipo: 'matematicas', titulo: 'Matemáticas'       },
    { tipo: 'geografia',   titulo: 'Geografía'         },
    { tipo: 'historia',    titulo: 'Historia'          },
    { tipo: 'eduinos',     titulo: 'Eduinos'           },
]

export default function CPNLogros() {
    const [logros, setLogros] = useState([])
    const [cargando, setCargando] = useState(true)
    const id_nene = sessionStorage.getItem('id_nene')

    useEffect(() => {
        cargar()
    }, [])

    function cargar() {
        setCargando(true)
        listarLogros(id_nene)
            .then(setLogros)
            .finally(() => setCargando(false))
    }

    async function reclamar(id_logro) {
        try {
            await reclamarLogro(id_nene, id_logro)
            cargar()
        } catch (e) {
            console.error(e)
        }
    }

    if (cargando) return <div style={{ color: '#fff', padding: '2rem' }}>Cargando logros...</div>

    return (
        <div className='CPNLogros-contenedor'>
            <h2 className='CPNLogros-titulo'>Logros</h2>

            {GRUPOS.map(({ tipo, titulo }) => {
                const delTipo = logros.filter(l => l.tipo === tipo)
                if (!delTipo.length) return null
                return (
                    <div key={tipo} className='CPNLogros-grupo'>
                        <h3 className='CPNLogros-grupoTitulo'>{titulo}</h3>
                        <div className='CPNLogros-tarjetas'>
                            {delTipo.map(logro => {
                                const conseguido = logro.progreso >= logro.meta
                                const porcentaje = Math.min(100, Math.round((logro.progreso / logro.meta) * 100))
                                return (
                                    <div
                                        key={logro.id_logro}
                                        className={`CPNLogros-tarjeta${conseguido ? ' CPNLogros-tarjeta--conseguido' : ''}${logro.reclamado ? ' CPNLogros-tarjeta--reclamado' : ''}`}
                                    >
                                        <img
                                            className='CPNLogros-imagen'
                                            src={logro.imagen}
                                            alt={logro.nombre}
                                            onError={e => { e.target.src = '/icons/sin_foto.jpg' }}
                                        />
                                        <div className='CPNLogros-info'>
                                            <p className='CPNLogros-nombre'>{logro.nombre}</p>
                                            <p className='CPNLogros-descripcion'>{logro.descripcion}</p>
                                            <div className='CPNLogros-barraFondo'>
                                                <div className='CPNLogros-barraRelleno' style={{ width: `${porcentaje}%` }} />
                                            </div>
                                            <p className='CPNLogros-progresoTexto'>{logro.progreso} / {logro.meta}</p>
                                        </div>
                                        <div className='CPNLogros-pie'>
                                            <span className='CPNLogros-recompensa'>+{logro.recompensa_monedas} 🪙</span>
                                            {conseguido && !logro.reclamado
                                                ? <button className='CPNLogros-botonReclamar' onClick={() => reclamar(logro.id_logro)}>Reclamar</button>
                                                : logro.reclamado
                                                    ? <span className='CPNLogros-reclamado'>✓ Reclamado</span>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

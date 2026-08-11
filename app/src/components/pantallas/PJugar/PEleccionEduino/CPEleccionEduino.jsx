import React, { useEffect, useState, useMemo } from 'react'
import { listarEduinos } from '../../../../services/SEduinos'
import './CPEleccionEduino.css'
import '../../PEduinos/CPEduinos.css'
import CPComenzarBatalla from './PComenzarBatalla/CPComenzarBatalla'

export default function CPEleccionEduino({ eduinoSeleccionado, onSeleccionarEduino, onEnBatalla }) {

    const [eduinos, setEduinos] = useState([])
    const [orden, setOrden] = useState('nivel')
    const [tipoFiltro, setTipoFiltro] = useState(null)
    const id_nene = sessionStorage.getItem('id_nene')

    useEffect(() => {
        listarEduinos(id_nene)
            .then(todos => setEduinos(todos.filter(e => e.desbloqueado)))
            .catch(console.error)
    }, [])

    const tiposDisponibles = useMemo(() =>
        [...new Set(eduinos.map(e => e.tipo).filter(t => t && t !== '???'))].sort()
    , [eduinos])

    const eduinosMostrados = useMemo(() => {
        let lista = tipoFiltro ? eduinos.filter(e => e.tipo === tipoFiltro) : [...eduinos]
        switch (orden) {
            case 'nivel':
                lista.sort((a, b) => Math.max(...b.copias.map(c => c.nivel)) - Math.max(...a.copias.map(c => c.nivel)))
                break
            case 'fuerza':
                lista.sort((a, b) => b.fuerza - a.fuerza)
                break
            case 'vida':
                lista.sort((a, b) => b.vida - a.vida)
                break
        }
        return lista
    }, [eduinos, orden, tipoFiltro])

    if (eduinoSeleccionado) {
        return <CPComenzarBatalla eduino={eduinoSeleccionado} onVolver={() => onSeleccionarEduino(null)} onEnBatalla={onEnBatalla} />
    }

    return (
        <div className='CPEleccionEduino-wrapper'>
            <div className='CPEduinos-contenedorBotonesOrdenar'>
                <div className='CPEduinos-barraFiltros'>
                    <div className='CPEduinos-grupoFiltro'>
                        <span className='CPEduinos-filtroLabel'>Ordenar</span>
                        <div className='CPEduinos-pils'>
                            <button className={`CPEduinos-pil ${orden === 'nivel' ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setOrden('nivel')}>Nivel</button>
                            <button className={`CPEduinos-pil ${orden === 'fuerza' ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setOrden('fuerza')}>Fuerza</button>
                            <button className={`CPEduinos-pil ${orden === 'vida' ? 'CPEduinos-pil--activo' : ''}`} onClick={() => setOrden('vida')}>Vida</button>
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
                                <img src="imagenes/eduinos/eduino_objetos/orbes/todo.png" alt="Todos" />
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
            <div className='CPEleccionEduino-contenedor'>
                {eduinosMostrados.length === 0 ? (
                    <div className='CPEleccionEduino-vacio'>
                        <p>No tienes ningún Eduino todavía.</p>
                        <p>¡Ve a la Tienda y consigue uno!</p>
                    </div>
                ) : (
                    eduinosMostrados.map(eduino => {
                        const maxNivel = Math.max(...eduino.copias.map(c => c.nivel))
                        return (
                            <div
                                key={eduino.id_eduino}
                                className='CPEleccionEduino-tarjeta'
                                onClick={() => onSeleccionarEduino(eduino)}
                            >
                                <img
                                    className='CPEleccionEduino-foto'
                                    src={`/${eduino.imagen_perfil}`}
                                    alt={eduino.nombre}
                                />
                                <p className='CPEleccionEduino-nombre'>{eduino.nombre}</p>
                                <span className='CPEleccionEduino-nivel'>Nv. {maxNivel}</span>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

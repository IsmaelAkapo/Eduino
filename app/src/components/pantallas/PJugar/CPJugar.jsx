import { useState } from 'react'
import './CPJugar.css'
import CPEleccionAsignarura from './PEleccionAsignarura/CPEleccionAsignarura'
import CPEleccionMatematicas from './PEleccionAsignarura/PEleccionMatematicas/CPEleccionMatematicas'
import CPEleccionLengua from './PEleccionAsignarura/PEleccionLengua/CPEleccionLengua'
import CPEleccionGeografia from './PEleccionAsignarura/PEleccionGeografia/CPEleccionGeografia'
import CPEleccionHistoria from './PEleccionAsignarura/PEleccionHistoria/CPEleccionHistoria'
import CPEleccionEduino from './PEleccionEduino/CPEleccionEduino'

const ASIGNATURAS = ['lengua', 'matematicas', 'ingles', 'geografia', 'historia']

export default function CPJugar() {
    const [eleccion, setEleccion] = useState('seleccion')
    const [eduinoSeleccionado, setEduinoSeleccionado] = useState(null)
    const [enBatalla, setEnBatalla] = useState(false)

    const enAsignatura = ASIGNATURAS.includes(eleccion)

    return (
        <>
            <div className={`CPJugar-contenedorSeleccionModoJuego ${eleccion === 'seleccion' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                <p className='CPJugar-tituloModo'>Selecciona tu modo</p>
                <div className='CPJugar-modoCards'>
                    <div className='CPJugar-targetaModoJuego competitivo'>
                        <p>Competitivo</p>
                        <img className="CPJugar-iconoTargeta" src="/imagenes/trofeo.png" alt="" />
                        <div className='CPJugar-separador' />
                        <p className='CPJugar-descripcionModo'>Elige tu Eduino favorito y combate. Gana trofeos demostrando que eres el más listo y rápido.</p>
                        <p className='CPJugar-botonComenzar' onClick={() => setEleccion('competitivo')}>Comenzar</p>
                    </div>
                    <div className='CPJugar-targetaModoJuego entrenamiento'>
                        <p>Entrenamiento</p>
                        <img className="CPJugar-iconoTargeta" src="/imagenes/educacion.png" alt="" />
                        <div className='CPJugar-separador' />
                        <p className='CPJugar-descripcionModo'>Aprende y mejora entrenando tu cerebro. Gana monedas para los combates reales.</p>
                        <p className='CPJugar-botonComenzar' onClick={() => setEleccion('clases')}>Comenzar</p>
                    </div>
                </div>
            </div>

            <div className={`CPJugar-contenedorEleccionClase ${eleccion === 'competitivo' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                {!enBatalla && (
                    <img className="CPJugar-iconoAtras" src="/icons/atras.png" alt=""
                        onClick={() => eduinoSeleccionado ? setEduinoSeleccionado(null) : setEleccion('seleccion')} />
                )}
                <CPEleccionEduino
                    eduinoSeleccionado={eduinoSeleccionado}
                    onSeleccionarEduino={setEduinoSeleccionado}
                    onEnBatalla={setEnBatalla}
                />
            </div>

            <div className={`CPJugar-contenedorEleccionClase ${eleccion === 'clases' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                <img className="CPJugar-iconoAtras" src="/icons/atras.png" alt="" onClick={() => setEleccion('seleccion')} />
                <CPEleccionAsignarura onSeleccionar={setEleccion} />
            </div>

            <div className={`CPJugar-contenedorAsignatura ${eleccion === 'matematicas' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                <CPEleccionMatematicas onVolver={() => setEleccion('clases')} />
            </div>

            <div className={`CPJugar-contenedorAsignatura ${eleccion === 'lengua' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                <CPEleccionLengua onVolver={() => setEleccion('clases')} />
            </div>

            <div className={`CPJugar-contenedorAsignatura ${eleccion === 'geografia' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                <CPEleccionGeografia onVolver={() => setEleccion('clases')} />
            </div>

            <div className={`CPJugar-contenedorAsignatura ${eleccion === 'historia' ? "CPJugar-contenedorSeleccionModoJuego--destapado" : "CPJugar-contenedorSeleccionModoJuego--tapado"}`}>
                <CPEleccionHistoria onVolver={() => setEleccion('clases')} />
            </div>
        </>
    )
}

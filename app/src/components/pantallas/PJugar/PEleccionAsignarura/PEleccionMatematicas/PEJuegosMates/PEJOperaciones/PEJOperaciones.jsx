import React, { useEffect, useState } from 'react'

import { listarOperaciones } from '../../../../../../../services/matematicas/SOperaciones'
import { ganarMonedas, sumarPuntuacion } from '../../../../../../../services/SNenes'
import COperacion from './COperacion/COperacion'

import './PEJOperaciones.css'

export default function PEJOperaciones({ onJugando }) {

    const [operaciones, setOperaciones] = useState([])
    const [numeroPreguntas, setNumeroPreguntas] = useState('5')
    const [jugando, setJugando] = useState(false)
    const [preguntas, setPreguntas] = useState([])
    const [indice, setIndice] = useState(0)
    const [respuestaElegida, setRespuestaElegida] = useState(null)
    const [correctas, setCorrectas] = useState(0)
    const [monedasGanadas, setMonedasGanadas] = useState(0)
    const [terminado, setTerminado] = useState(false)


    useEffect(() => {
        listarOperaciones().then(setOperaciones).catch(console.error)
    }, [])

    function comenzar() {
        if (!operaciones?.length) return
        const seleccionadas = [...operaciones].sort(() => Math.random() - 0.5).slice(0, parseInt(numeroPreguntas))
        setPreguntas(seleccionadas)
        setIndice(0)
        setCorrectas(0)
        setMonedasGanadas(0)
        setRespuestaElegida(null)
        setTerminado(false)
        setJugando(true)
        onJugando?.(true)
    }

    function salir() {
        setJugando(false)
        setTerminado(false)
        setPreguntas([])
        onJugando?.(false)
    }

    function elegirRespuesta(opcion) {
        if (respuestaElegida) return
        const pregunta = preguntas[indice]
        setRespuestaElegida(opcion)
        if (opcion === pregunta.respuesta) {
            setCorrectas(c => c + 1)
            setMonedasGanadas(m => m + pregunta.recompensa)
        }
    }

    function siguiente() {
        if (indice + 1 >= preguntas.length) {
            const id_nene = sessionStorage.getItem('id_nene')
            if (id_nene) {
                if (monedasGanadas > 0) ganarMonedas(id_nene, monedasGanadas)
                sumarPuntuacion(id_nene, 'matematicas', 'operaciones')
            }
            setTerminado(true)
        } else {
            setIndice(i => i + 1)
            setRespuestaElegida(null)
        }
    }

    const preguntaActual = preguntas[indice]

  return (
    <>
        <div className='PEJOperaciones-contenedor'>
            {!jugando && (
                <>
                    <div className='PEJOperaciones-contenedorSeleccion'>
                        <h4>Número de operaciones</h4>
                        <div className='PEJOperaciones-contenedorBotones'>
                            <p onClick={() => setNumeroPreguntas('5')}  className={numeroPreguntas === '5'  ? 'PEJOperaciones-botonActivo' : ''}>5 preguntas</p>
                            <p onClick={() => setNumeroPreguntas('10')} className={numeroPreguntas === '10' ? 'PEJOperaciones-botonActivo' : ''}>10 preguntas</p>
                            <p onClick={() => setNumeroPreguntas('15')} className={numeroPreguntas === '15' ? 'PEJOperaciones-botonActivo' : ''}>15 preguntas</p>
                        </div>
                        <div className='PEJOperaciones-contenedorBotonComenzar'>
                            <p className='PEJOperaciones-botonEmpezar' onClick={comenzar}>¡¡¡Comenzar!!!</p>
                        </div>
                    </div>
                </>
            )}

            {jugando && !terminado && preguntaActual && (
                <div className='PEJOperaciones-juego'>
                    <div className='PEJOperaciones-cabecera'>
                        <h3>{indice + 1} / {preguntas.length}</h3>
                        <img className='moneda' src="imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
                        <span className='PEJOperaciones-monedas'> {monedasGanadas}</span>
                    </div>

                    <COperacion
                        pregunta={preguntaActual}
                        respuestaElegida={respuestaElegida}
                        onElegir={elegirRespuesta}
                    />

                    {respuestaElegida && (
                        <div className='PEJOperaciones-contenedorBotonComenzar'>
                            <p className='PEJOperaciones-botonEmpezar' onClick={siguiente}>
                                {indice + 1 >= preguntas.length ? 'Ver resultados' : 'Siguiente'}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {terminado && (
                <div className='PEJOperaciones-resultados'>
                    <h2>¡Terminado!</h2>
                    <div className='PEJOperaciones-contenedorSeleccion'>
                        <p className='PEJOperaciones-puntaje'>{correctas} / {preguntas.length} correctas</p>
                        <p className='PEJOperaciones-monedasResultado'>+{monedasGanadas} 🪙</p>
                        <div className='PEJOperaciones-contenedorBotonComenzar'>
                            <p className='PEJOperaciones-botonEmpezar' onClick={salir}>Volver</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </>
  )
}

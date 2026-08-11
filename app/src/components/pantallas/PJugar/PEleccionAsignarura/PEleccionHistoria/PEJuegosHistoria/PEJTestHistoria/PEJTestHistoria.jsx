import { useEffect, useState } from 'react'
import { listarHistoria } from '../../../../../../../services/SHistoria'
import { ganarMonedas, sumarPuntuacion } from '../../../../../../../services/SNenes'
import CTestPregunta from './CTestPregunta/CTestPregunta'
import '../../../PEleccionMatematicas/PEJuegosMates/PEJOperaciones/PEJOperaciones.css'

export default function PEJTestHistoria({ onJugando }) {
    const [preguntas, setPreguntas] = useState([])
    const [numeroPreguntas, setNumeroPreguntas] = useState('5')
    const [jugando, setJugando] = useState(false)
    const [ronda, setRonda] = useState([])
    const [indice, setIndice] = useState(0)
    const [respuestaElegida, setRespuestaElegida] = useState(null)
    const [correctas, setCorrectas] = useState(0)
    const [monedasGanadas, setMonedasGanadas] = useState(0)
    const [terminado, setTerminado] = useState(false)

    useEffect(() => {
        listarHistoria().then(setPreguntas).catch(console.error)
    }, [])

    function comenzar() {
        if (!preguntas?.length) return
        const seleccionadas = [...preguntas].sort(() => Math.random() - 0.5).slice(0, parseInt(numeroPreguntas))
        setRonda(seleccionadas)
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
        setRonda([])
        onJugando?.(false)
    }

    function elegirRespuesta(letra) {
        if (respuestaElegida) return
        const pregunta = ronda[indice]
        setRespuestaElegida(letra)
        if (letra === pregunta.respuesta) {
            setCorrectas(c => c + 1)
            setMonedasGanadas(m => m + pregunta.recompensa)
        }
    }

    function siguiente() {
        if (indice + 1 >= ronda.length) {
            const id_nene = sessionStorage.getItem('id_nene')
            if (id_nene && monedasGanadas > 0) ganarMonedas(id_nene, monedasGanadas)
            if (id_nene) sumarPuntuacion(id_nene, 'historia', 'test')
            setTerminado(true)
        } else {
            setIndice(i => i + 1)
            setRespuestaElegida(null)
        }
    }

    const preguntaActual = ronda[indice]

    return (
        <div className='PEJOperaciones-contenedor'>
            {!jugando && (
                <div className='PEJOperaciones-contenedorSeleccion'>
                    <h4>Número de preguntas</h4>
                    <div className='PEJOperaciones-contenedorBotones'>
                        <p onClick={() => setNumeroPreguntas('5')}  className={numeroPreguntas === '5'  ? 'PEJOperaciones-botonActivo' : ''}>5 preguntas</p>
                        <p onClick={() => setNumeroPreguntas('10')} className={numeroPreguntas === '10' ? 'PEJOperaciones-botonActivo' : ''}>10 preguntas</p>
                        <p onClick={() => setNumeroPreguntas('15')} className={numeroPreguntas === '15' ? 'PEJOperaciones-botonActivo' : ''}>15 preguntas</p>
                    </div>
                    <div className='PEJOperaciones-contenedorBotonComenzar'>
                        <p className='PEJOperaciones-botonEmpezar' onClick={comenzar}>¡¡¡Comenzar!!!</p>
                    </div>
                </div>
            )}

            {jugando && !terminado && preguntaActual && (
                <div className='PEJOperaciones-juego'>
                    <div className='PEJOperaciones-cabecera'>
                        <h3>{indice + 1} / {ronda.length}</h3>
                        <img className='moneda' src="imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
                        <span className='PEJOperaciones-monedas'>{monedasGanadas}</span>
                    </div>

                    <CTestPregunta
                        pregunta={preguntaActual}
                        respuestaElegida={respuestaElegida}
                        onElegir={elegirRespuesta}
                    />

                    {respuestaElegida && (
                        <div className='PEJOperaciones-contenedorBotonComenzar'>
                            <p className='PEJOperaciones-botonEmpezar' onClick={siguiente}>
                                {indice + 1 >= ronda.length ? 'Ver resultados' : 'Siguiente'}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {terminado && (
                <div className='PEJOperaciones-resultados'>
                    <h2>¡Terminado!</h2>
                    <div className='PEJOperaciones-contenedorSeleccion'>
                        <p className='PEJOperaciones-puntaje'>{correctas} / {ronda.length} correctas</p>
                        <p className='PEJOperaciones-monedasResultado'>+{monedasGanadas} 🪙</p>
                        <div className='PEJOperaciones-contenedorBotonComenzar'>
                            <p className='PEJOperaciones-botonEmpezar' onClick={salir}>Volver</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

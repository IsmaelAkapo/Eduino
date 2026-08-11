import { useEffect, useState } from 'react'
import { listarProblemas } from '../../../../../../../services/matematicas/SProblemas'
import { ganarMonedas, sumarPuntuacion } from '../../../../../../../services/SNenes'
import CProblema from './CProblemas/CProblema'
import '../PEJOperaciones/PEJOperaciones.css'

const MONEDAS_POR_CORRECTO = 5

export default function PEJProblemas({ onJugando }) {

    const [problemas, setProblemas]             = useState([])
    const [numeroPreguntas, setNumeroPreguntas] = useState('5')
    const [jugando, setJugando]                 = useState(false)
    const [preguntas, setPreguntas]             = useState([])
    const [indice, setIndice]                   = useState(0)
    const [esperando, setEsperando]             = useState(false)
    const [correctas, setCorrectas]             = useState(0)
    const [monedasGanadas, setMonedasGanadas]   = useState(0)
    const [terminado, setTerminado]             = useState(false)

    useEffect(() => {
        listarProblemas().then(setProblemas).catch(console.error)
    }, [])

    function comenzar() {
        if (!problemas?.length) return
        const seleccionadas = [...problemas].sort(() => Math.random() - 0.5).slice(0, parseInt(numeroPreguntas))
        setPreguntas(seleccionadas)
        setIndice(0)
        setCorrectas(0)
        setMonedasGanadas(0)
        setEsperando(false)
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

    function elegirRespuesta(esCorrecta) {
        if (esCorrecta) {
            setCorrectas(c => c + 1)
            setMonedasGanadas(m => m + MONEDAS_POR_CORRECTO)
        }
        setEsperando(true)
    }

    function siguiente() {
        if (indice + 1 >= preguntas.length) {
            const id_nene = sessionStorage.getItem('id_nene')
            if (id_nene) {
                if (monedasGanadas > 0) ganarMonedas(id_nene, monedasGanadas)
                sumarPuntuacion(id_nene, 'matematicas', 'problemas')
            }
            setTerminado(true)
        } else {
            setIndice(i => i + 1)
            setEsperando(false)
        }
    }

    const preguntaActual = preguntas[indice]

    return (
        <div className='PEJOperaciones-contenedor'>

            {!jugando && (
                <div className='PEJOperaciones-contenedorSeleccion'>
                    <h4>Número de problemas</h4>
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
                        <h3>{indice + 1} / {preguntas.length}</h3>
                        <img className='moneda' src="imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
                        <span className='PEJOperaciones-monedas'>{monedasGanadas}</span>
                    </div>

                    <CProblema
                        key={indice}
                        pregunta={preguntaActual}
                        onElegir={elegirRespuesta}
                    />

                    {esperando && (
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
    )
}

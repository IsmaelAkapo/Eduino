import { useEffect, useState } from 'react'
import { listarPalabras } from '../../../../../../../services/lengua/SPalabras'
import { ganarMonedas, sumarPuntuacion } from '../../../../../../../services/SNenes'
import CJuegoPalabra from './CJuegoPalabra/CJuegoPalabra'
import './PEJPalabras.css'

function mezclar(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function PEJPalabras({ onJugando }) {
    const [palabras, setPalabras] = useState([])
    const [numeroPalabras, setNumeroPalabras] = useState('5')
    const [jugando, setJugando] = useState(false)
    const [ronda, setRonda] = useState([])
    const [indice, setIndice] = useState(0)
    const [correctas, setCorrectas] = useState(0)
    const [monedasGanadas, setMonedasGanadas] = useState(0)
    const [terminado, setTerminado] = useState(false)
    const [resultado, setResultado] = useState(null)

    useEffect(() => {
        listarPalabras().then(setPalabras).catch(console.error)
    }, [])

    function comenzar() {
        if (!palabras?.length) return
        const seleccionadas = mezclar(palabras).slice(0, parseInt(numeroPalabras))
        setRonda(seleccionadas)
        setIndice(0)
        setCorrectas(0)
        setMonedasGanadas(0)
        setTerminado(false)
        setResultado(null)
        setJugando(true)
        onJugando?.(true)
    }

    function salir() {
        setJugando(false)
        setTerminado(false)
        setRonda([])
        onJugando?.(false)
    }

    function manejarResultado(esCorrecta) {
        const palabraActual = ronda[indice]
        setResultado(esCorrecta ? 'correcto' : 'incorrecto')
        if (esCorrecta) {
            setCorrectas(c => c + 1)
            setMonedasGanadas(m => m + palabraActual.respuesta)
        }
    }

    function siguiente() {
        if (indice + 1 >= ronda.length) {
            const id_nene = sessionStorage.getItem('id_nene')
            if (id_nene) {
                if (monedasGanadas > 0) ganarMonedas(id_nene, monedasGanadas)
                sumarPuntuacion(id_nene, 'lengua', 'palabras')
            }
            setTerminado(true)
        } else {
            setIndice(i => i + 1)
            setResultado(null)
        }
    }

    const palabraActual = ronda[indice]

    return (
        <div className='PEJPalabras-contenedor'>

            {!jugando && (
                <div className='PEJPalabras-seleccion'>
                    <h4 className='PEJPalabras-titulo'>Número de palabras</h4>
                    <div className='PEJPalabras-botonesNum'>
                        <p onClick={() => setNumeroPalabras('5')}  className={numeroPalabras === '5'  ? 'PEJPalabras-numActivo' : ''}>5 palabras</p>
                        <p onClick={() => setNumeroPalabras('10')} className={numeroPalabras === '10' ? 'PEJPalabras-numActivo' : ''}>10 palabras</p>
                        <p onClick={() => setNumeroPalabras('15')} className={numeroPalabras === '15' ? 'PEJPalabras-numActivo' : ''}>15 palabras</p>
                    </div>
                    <p className='PEJPalabras-botonEmpezar' onClick={comenzar}>¡¡¡Comenzar!!!</p>
                </div>
            )}

            {jugando && !terminado && palabraActual && (
                <div className='PEJPalabras-juego'>
                    <div className='PEJPalabras-cabecera'>
                        <h3>{indice + 1} / {ronda.length}</h3>
                        <img className='PEJPalabras-moneda' src="imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
                        <span>{monedasGanadas}</span>
                    </div>

                    <CJuegoPalabra
                        key={indice}
                        pregunta={palabraActual}
                        onResultado={manejarResultado}
                    />

                    {resultado && (
                        <>
                            <p className={`PEJPalabras-feedback PEJPalabras-feedback--${resultado}`}>
                                {resultado === 'correcto'
                                    ? '¡Correcto!'
                                    : `Incorrecto — era: ${palabraActual.palabra.toUpperCase()}`}
                            </p>
                            <div className='PEJPalabras-wrapBoton'>
                                <p className='PEJPalabras-botonEmpezar' onClick={siguiente}>
                                    {indice + 1 >= ronda.length ? 'Ver resultados' : 'Siguiente'}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {terminado && (
                <div className='PEJPalabras-resultados'>
                    <h2>¡Terminado!</h2>
                    <div className='PEJPalabras-seleccion'>
                        <p className='PEJPalabras-puntaje'>{correctas} / {ronda.length} correctas</p>
                        <p className='PEJPalabras-monedasResultado'>+{monedasGanadas} 🪙</p>
                        <p className='PEJPalabras-botonEmpezar' onClick={salir}>Volver</p>
                    </div>
                </div>
            )}
        </div>
    )
}

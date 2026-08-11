import { useEffect, useState, useRef } from 'react'
import { listarTodosEduinos } from '../../../../../../services/SEduinos'
import { actualizarTrofeos, ganarMonedas } from '../../../../../../services/SNenes'
import CActividad from './CActividad/CActividad'
import './CPBatalla.css'

function trofeosAleatorios(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const FONDOS = ['imagenes/fondo/1.jpg', 'imagenes/fondo/2.jpg', 'imagenes/fondo/3.jpg', 'imagenes/fondo/4.png',
    'imagenes/fondo/5.jpg', 'imagenes/fondo/6.jpg', 'imagenes/fondo/7.jpg', 'imagenes/fondo/8.jpg', 'imagenes/fondo/9.jpg',
    'imagenes/fondo/10.jpg', 'imagenes/fondo/11.jpg', 'imagenes/fondo/12.jpg', 'imagenes/fondo/13.jpg', 'imagenes/fondo/14.jpg',
    'imagenes/fondo/15.jpg', 'imagenes/fondo/16.jpg', 'imagenes/fondo/17.jpg'
]

function fondoAleatorio() {
    return FONDOS[Math.floor(Math.random() * FONDOS.length)]
}

function calcularDano(fuerza) {
    return Math.max(1, Math.floor(fuerza * (0.25 + Math.random() * 0.35)))
}

function ataqueAleatorio(rival) {
    const lista = [rival.ataque1, rival.ataque2, rival.ataque3, rival.ataque4]
    return lista[Math.floor(Math.random() * lista.length)]
}

export default function CPBatalla({ eduino, onVolver }) {
    const idNene = sessionStorage.getItem('id_nene')

    const mejorCopia = eduino?.copias?.length
        ? eduino.copias.reduce((best, c) => c.nivel > best.nivel ? c : best, eduino.copias[0])
        : null

    const nivelJugador   = mejorCopia?.nivel ?? 1
    const fuerzaJugador  = mejorCopia?.fuerza_actual ?? eduino?.fuerza ?? 0
    const vidaMaxJugador = eduino
        ? eduino.vida + nivelJugador * Math.round(eduino.vida * 0.2)
        : 0

    const [rival,          setRival]          = useState(null)
    const [nivelRival,     setNivelRival]     = useState(null)
    const [vidaJugador,    setVidaJugador]    = useState(null)
    const [vidaRival,      setVidaRival]      = useState(null)
    const [ataqueActivo,   setAtaqueActivo]   = useState(null)
    const [turnoJugador,   setTurnoJugador]   = useState(true)
    const [rivalSacude,    setRivalSacude]    = useState(false)
    const [jugadorSacude,  setJugadorSacude]  = useState(false)
    const [rivalFainting,  setRivalFainting]  = useState(false)
    const [jugadorFainting,setJugadorFainting]= useState(false)
    const [log,            setLog]            = useState([])
    const [finBatalla,     setFinBatalla]     = useState(null)
    const [trofeosCambio,  setTrofeosCambio]  = useState(null)
    const [monedasGanadas, setMonedasGanadas] = useState(null)

    const fondo  = useRef(fondoAleatorio()).current
    const logRef = useRef(null)

    useEffect(() => {
        if (vidaMaxJugador) setVidaJugador(vidaMaxJugador)
    }, [])

    useEffect(() => {
        listarTodosEduinos().then(todos => {
            const candidatos = todos.filter(e => e.id_eduino !== eduino?.id_eduino)
            if (!candidatos.length) return
            const elegido = candidatos[Math.floor(Math.random() * candidatos.length)]

            const nivelMin = nivelJugador
            const nivelMax = Math.min(nivelJugador + 4, 50)
            const nivel    = Math.floor(Math.random() * (nivelMax - nivelMin + 1)) + nivelMin

            const multVida   = 1 + (nivel - 1) * 0.08
            const multFuerza = 1 + (nivel - 1) * 0.05
            const rivalEscalado = {
                ...elegido,
                vida:   Math.round(elegido.vida   * multVida),
                fuerza: Math.round(elegido.fuerza * multFuerza),
            }

            setNivelRival(nivel)
            setRival(rivalEscalado)
            setVidaRival(rivalEscalado.vida)
        }).catch(console.error)
    }, [])

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
    }, [log])

    function agregarLog(texto, tipo) {
        setLog(prev => [...prev, { texto, tipo, id: Date.now() + Math.random() }])
    }

    function terminarBatalla(resultado) {
        const esVictoria = resultado === 'victoria'
        const cambio     = esVictoria ? trofeosAleatorios(10, 20) : trofeosAleatorios(3, 8)
        const monedas    = esVictoria ? trofeosAleatorios(30, 80)  : trofeosAleatorios(5, 20)
        setFinBatalla(resultado)
        setTrofeosCambio(cambio)
        setMonedasGanadas(monedas)
        actualizarTrofeos(idNene, esVictoria ? cambio : -cambio).catch(console.error)
        ganarMonedas(idNene, monedas).catch(console.error)
        setTimeout(() => onVolver?.(), 3500)
    }

    function seleccionarAtaque(ataque) {
        if (!turnoJugador || finBatalla) return
        setTurnoJugador(false)
        setAtaqueActivo(ataque)
    }

    function manejarRespuesta(esCorrecta) {
        if (finBatalla) return

        const ataqueNombre      = ataqueActivo
        const vidaRivalActual   = vidaRival
        const vidaJugadorActual = vidaJugador
        const rivalActual       = rival

        if (esCorrecta) {
            const dano = calcularDano(fuerzaJugador)
            const vidaRivalNueva = Math.max(0, vidaRivalActual - dano)
            setVidaRival(vidaRivalNueva)
            setRivalSacude(true)
            agregarLog(`${eduino.nombre} usó ${ataqueNombre} — ${dano} daño`, 'golpe')
            setTimeout(() => setRivalSacude(false), 500)
            if (vidaRivalNueva <= 0) {
                setAtaqueActivo(null)
                setRivalFainting(true)
                setTimeout(() => terminarBatalla('victoria'), 1500)
                return
            }
        } else {
            agregarLog(`${eduino.nombre} usó ${ataqueNombre} — ¡Falló!`, 'fallo')
        }

        setAtaqueActivo(null)

        // Turno del enemigo
        setTimeout(() => {
            if (!rivalActual) { setTurnoJugador(true); return }

            const acierta      = Math.random() < 0.8
            const nombreAtaque = ataqueAleatorio(rivalActual)

            if (acierta) {
                const dano = calcularDano(rivalActual.fuerza)
                const vidaJugadorNueva = Math.max(0, vidaJugadorActual - dano)
                setVidaJugador(vidaJugadorNueva)
                setJugadorSacude(true)
                agregarLog(`${rivalActual.nombre} usó ${nombreAtaque} — ${dano} daño`, 'enemigo-golpe')
                setTimeout(() => setJugadorSacude(false), 500)
                if (vidaJugadorNueva <= 0) {
                    setJugadorFainting(true)
                    setTimeout(() => terminarBatalla('derrota'), 1500)
                    return
                }
            } else {
                agregarLog(`${rivalActual.nombre} usó ${nombreAtaque} — ¡Falló!`, 'enemigo-fallo')
            }

            setTimeout(() => setTurnoJugador(true), 500)
        }, 700)
    }

    const ataques = eduino
        ? [eduino.ataque1, eduino.ataque2, eduino.ataque3, eduino.ataque4]
        : []

    return (
        <div className='CPBatalla-pantalla'>

            {/* Arena + Log */}
            <div className='CPBatalla-zonaJuego'>

                <div className='CPBatalla-contenedor'>
                    <img className='CPBatalla-fondo' src={fondo} alt="" />
                    <div className='CPBatalla-arena'>

                        <div className={`CPBatalla-ladoJugador ${jugadorSacude ? 'CPBatalla-lado--sacudido' : ''}`}>
                            <span className='CPBatalla-nivelBadge'>Nv.{nivelJugador}</span>
                            <div className='CPBatalla-vidaWrapper'>
                                <div className='CPBatalla-vidaBarra'
                                    style={{ width: `${vidaJugador != null && vidaMaxJugador ? (vidaJugador / vidaMaxJugador) * 100 : 0}%` }} />
                            </div>
                            <div className={jugadorFainting ? 'CPBatalla--fainteo' : ''}>
                                <img className='CPBatalla-eduino CPBatalla-eduino--jugador'
                                    src={`/${eduino?.imagen_eduino}`} alt={eduino?.nombre} />
                            </div>
                        </div>

                        <div className={`CPBatalla-ladoRival ${rivalSacude ? 'CPBatalla-lado--sacudido' : ''}`}>
                            <span className='CPBatalla-nivelBadge'>Nv.{nivelRival ?? '...'}</span>
                            <div className='CPBatalla-vidaWrapper'>
                                <div className='CPBatalla-vidaBarra'
                                    style={{ width: `${vidaRival != null && rival ? (vidaRival / rival.vida) * 100 : 0}%` }} />
                            </div>
                            <div className={rivalFainting ? 'CPBatalla--fainteo' : ''}>
                                <img className='CPBatalla-eduino CPBatalla-eduino--rival'
                                    src={rival ? `/${rival.imagen_eduino}` : ''}
                                    alt={rival?.nombre ?? ''} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='CPBatalla-log' ref={logRef}>
                    {log.length === 0 && (
                        <p className='CPBatalla-logVacio'>¡Que empiece la batalla!</p>
                    )}
                    {log.map(e => (
                        <p key={e.id} className={`CPBatalla-logEntrada CPBatalla-logEntrada--${e.tipo}`}>
                            {e.texto}
                        </p>
                    ))}
                </div>

            </div>

            {/* Zona inferior */}
            <div className='CPBatalla-inferior'>
                {finBatalla ? (
                    <div className='CPBatalla-finBatalla'>
                        <p className='CPBatalla-finTitulo'>
                            {finBatalla === 'victoria' ? '¡Victoria!' : '¡Derrota!'}
                        </p>
                        {trofeosCambio !== null && (
                            <div className={`CPBatalla-finTrofeos CPBatalla-finTrofeos--${finBatalla}`}>
                                <span>{finBatalla === 'victoria' ? '+' : '-'}{trofeosCambio}</span>
                                <img src="imagenes/trofeo.png" alt="trofeo" className='CPBatalla-finIcono' />
                            </div>
                        )}
                        {monedasGanadas !== null && (
                            <div className='CPBatalla-finMonedas'>
                                <span>+{monedasGanadas}</span>
                                <img src="imagenes/eduinos/eduino_objetos/EduCoin.png" alt="monedas" className='CPBatalla-finIcono' />
                            </div>
                        )}
                    </div>
                ) : ataqueActivo ? (
                    <div className='CPBatalla-operacionWrapper'>
                        <CActividad key={ataqueActivo + Date.now()} onResponder={manejarRespuesta} />
                    </div>
                ) : (
                    <div className='CPBatalla-botonesAtaque'>
                        {ataques.map((ataque, i) => (
                            <div key={i}
                                className={`CPBatalla-botonAtaque ${!turnoJugador ? 'CPBatalla-botonAtaque--disabled' : ''}`}
                                onClick={() => seleccionarAtaque(ataque)}>
                                {ataque}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

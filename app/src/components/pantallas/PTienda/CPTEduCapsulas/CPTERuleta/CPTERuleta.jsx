import { useState, useEffect, useRef } from 'react'
import './CPTERuleta.css'
import { getEduinos, guardarEduino } from '../../../../../services/STienda'

const ITEM_W = 120
const VISIBLE = 5
const CENTER = Math.floor(VISIBLE / 2)
const N_ITEMS = 30

export default function CPTERuleta({ giros, onCerrar }) {
    const [terminado, setTerminado] = useState('no')
    const [eduinos, setEduinos] = useState([])
    const [girando, setGirando] = useState(false)
    const [ganadores, setGanadores] = useState([])
    const [tira, setTira] = useState([])
    const [girosRestantes, setGirosRestantes] = useState(giros)
    const [saltarAnimacion, setSaltarAnimacion] = useState(false)
    const stripRef = useRef(null)

    useEffect(() => {
        getEduinos().then(lista => {
            setEduinos(lista)
            setTira(Array.from({ length: VISIBLE * 3 }, () =>
                lista[Math.floor(Math.random() * lista.length)]
            ))
        }).catch(console.error)
    }, [])

    function girar() {
        if (girando || eduinos.length === 0 || girosRestantes <= 0) return

        const id_nene = sessionStorage.getItem('id_nene')
        const winner = eduinos[Math.floor(Math.random() * eduinos.length)]
        const nuevosGiros = girosRestantes - 1

        setGirosRestantes(nuevosGiros)

        if (saltarAnimacion) {
            setGanadores(prev => [...prev, winner])
            if (nuevosGiros <= 0) setTerminado('si')
            guardarEduino(id_nene, winner.id_eduino).catch(console.error)
            return
        }

        const rand = () => eduinos[Math.floor(Math.random() * eduinos.length)]
        const strip = Array.from({ length: N_ITEMS }, rand)
        strip.push(winner)
        for (let i = 0; i < VISIBLE; i++) strip.push(rand())

        setTira(strip)
        setGirando(true)

        if (stripRef.current) {
            stripRef.current.style.transition = 'none'
            stripRef.current.style.transform = 'translateX(0)'
        }

        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (stripRef.current) {
                stripRef.current.style.transition = 'transform 3.5s cubic-bezier(0.1, 0.4, 0.1, 1)'
                stripRef.current.style.transform = `translateX(-${(N_ITEMS - CENTER) * ITEM_W}px)`
            }
        }))

        setTimeout(() => {
            setGanadores(prev => [...prev, winner])
            setGirando(false)
            if (nuevosGiros <= 0) setTerminado('si')
            guardarEduino(id_nene, winner.id_eduino).catch(console.error)
        }, 3700)
    }

    return (
        <div className="CPTERuleta-contenedor">
            <p className="CPTERuleta-giros">
                {girosRestantes} {girosRestantes === 1 ? 'giro' : 'giros'} restantes
            </p>

            <div className="CPTERuleta-ventana">
                <div className="CPTERuleta-fade CPTERuleta-fade--izq" />
                <div className="CPTERuleta-selector" />
                <div className="CPTERuleta-tira" ref={stripRef}>
                    {tira.map((e, i) => (
                        <div key={i} className="CPTERuleta-item">
                            <img src={e.imagen_perfil} alt={e.nombre} />
                        </div>
                    ))}
                </div>
                <div className="CPTERuleta-fade CPTERuleta-fade--der" />
            </div>

            {ganadores.length > 0 && (
                <div className="CPTERuleta-resultados-fila">
                    {ganadores.map((e, i) => (
                        <div key={i} className="CPTERuleta-resultado">
                            <img src={e.imagen_eduino} alt={e.nombre} />
                            <p><strong>{e.nombre}</strong></p>
                        </div>
                    ))}
                </div>
            )}

            <div className='CPTERuleta-contenedorCheckSaltarAnimacion'>
                <label className="CPTERuleta-checkLabel">
                    <input
                        type="checkbox"
                        checked={saltarAnimacion}
                        onChange={e => setSaltarAnimacion(e.target.checked)}
                    />
                    Saltar animación
                </label>
            </div>
            <div className="CPTERuleta-contenedorBotones">
                <p
                    className={terminado === "no" ? "CPTERuleta-botonOculto" : ""}
                    onClick={onCerrar}
                >
                    Volver a la tienda
                </p>
                <p
                    className={girando || girosRestantes <= 0 ? "CPTERuleta-btnDesactivado" : ""}
                    onClick={girar}
                >
                    {girando ? "Girando..." : "¡Girar!"}
                </p>
            </div>
        </div>
    )
}

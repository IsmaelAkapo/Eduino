import { useState, useEffect, useRef } from 'react'
import { getComida, comprarComida } from '../../../../services/STienda'

export default function CPTEduFood({ monedas, setMonedas }) {
    const [comidas, setComidas] = useState([])
    const [errorAnimId, setErrorAnimId] = useState(null)
    const [flyingImg, setFlyingImg] = useState(null)
    const [comprando, setComprando] = useState(false)
    const imgRefs = useRef({})
    const id_nene = sessionStorage.getItem('id_nene')

    useEffect(() => {
        getComida().then(setComidas).catch(console.error)
    }, [])

    function dispararError(id) {
        setErrorAnimId(null)
        requestAnimationFrame(() => setErrorAnimId(id))
    }

    async function handleComprarComida(comida) {
        if (comprando) return
        if (monedas < comida.precio) {
            dispararError(comida.id_comida)
            return
        }
        setComprando(true)
        setMonedas(m => m - comida.precio)
        const rect = imgRefs.current[comida.id_comida]?.getBoundingClientRect()
        if (rect) setFlyingImg({ src: comida.imagen_perfil, top: rect.top, left: rect.left, size: rect.width })
        try {
            await comprarComida(id_nene, comida.id_comida, comida.precio)
        } catch {
            setMonedas(m => m + comida.precio)
            dispararError(comida.id_comida)
        } finally {
            setTimeout(() => setComprando(false), 800)
        }
    }

    return (
        <div className='CPTienda-contenedorComida'>
            {flyingImg && (
                <img
                    src={flyingImg.src}
                    className='CPTienda-imgFly'
                    style={{ top: flyingImg.top, left: flyingImg.left, width: flyingImg.size, height: flyingImg.size }}
                    onAnimationEnd={() => setFlyingImg(null)}
                />
            )}
            {comidas.map(comida => {
                const sinMonedas = monedas < comida.precio
                const conError = errorAnimId === comida.id_comida
                return (
                    <div key={comida.id_comida} className='CPTienda-card'>
                        <img
                            ref={el => imgRefs.current[comida.id_comida] = el}
                            src={comida.imagen_perfil}
                            alt={comida.nombre}
                        />
                        <h3>{comida.nombre}</h3>
                        <p>{comida.descripcion}</p>
                        <div className='CPTienda-badges'>
                            <span className='CPTienda-precio'>{comida.precio} 🪙</span>
                            <span className='CPTienda-alimentacion'>+{comida.alimentacion} 🍖</span>
                        </div>
                        <button
                            onClick={() => handleComprarComida(comida)}
                            onAnimationEnd={() => setErrorAnimId(null)}
                            className={`CPTienda-btnComprar${sinMonedas ? ' CPTienda-btnComprar--sinMonedas' : ''}${conError ? ' CPTienda-btnComprar--error' : ''}`}
                        >
                            Comprar
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

import { useState, useEffect } from "react"
import { getCapsulas, perderMonedas } from '../../../../services/STienda'

export default function CPTEduCapsulas({ monedas, setMonedas, onCompra }) {

    const [capsulas, setCapsulas] = useState([])
    const [errorAnimId, setErrorAnimId] = useState(null)
    const id_nene = sessionStorage.getItem('id_nene')

    useEffect(() => {
        getCapsulas().then(setCapsulas).catch(console.error)
    }, [])

    function dispararError(id) {
        setErrorAnimId(null)
        requestAnimationFrame(() => setErrorAnimId(id))
    }

    async function comprarCapsula(capsula) {
        if (monedas < capsula.precio) {
            dispararError(capsula.id_educapsulas)
            return
        }
        try {
            await perderMonedas(id_nene, capsula.precio)
            setMonedas(m => m - capsula.precio)
            onCompra(capsula.numero_giros)
        } catch {
            dispararError(capsula.id_educapsulas)
        }
    }

    return (
        <div className='CPTienda-contenedorCompraEduCapsulas'>
            {capsulas.map(capsula => {
                const sinMonedas = monedas < capsula.precio
                const conError = errorAnimId === capsula.id_educapsulas
                return (
                    <div key={capsula.id_educapsulas} className='CPTienda-card'>
                        <img src={capsula.imagen} alt={capsula.nombre} />
                        <h3>{capsula.nombre}</h3>
                        <p>{capsula.descripcion}</p>
                        <div className='CPTienda-badges'>
                            <span className='CPTienda-precio'>{capsula.precio} 🪙</span>
                        </div>
                        <button
                            onClick={() => comprarCapsula(capsula)}
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

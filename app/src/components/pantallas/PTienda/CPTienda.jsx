import { useState, useEffect } from 'react'
import './CPTienda.css'
import CPTEduFood from './CPTEduFood/CPTEduFood'
import CPTEduCapsulas from './CPTEduCapsulas/CPTEduCapsulas'
import CPTERuleta from './CPTEduCapsulas/CPTERuleta/CPTERuleta'
import { getMonedas } from '../../../services/STienda'

export default function CPTienda() {
    const [monedas, setMonedas] = useState(0)
    const [giros, setGiros] = useState(null)
    const id_nene = sessionStorage.getItem('id_nene')

    useEffect(() => {
        getMonedas(id_nene).then(setMonedas).catch(console.error)
    }, [])

    if (giros !== null) {
        return <CPTERuleta giros={giros} onCerrar={() => setGiros(null)} />
    }

    return (
        <div className='CPTienda-contenedor'>
            <div className='CPTienda-contenedorMonedas'>
                <h4>{monedas}</h4>
                <img src="/imagenes/eduinos/eduino_objetos/EduCoin.png" alt="" />
            </div>
            <div className='CPTienda-contenedorTienda'>
                <div className='CPTienda-separador'>
                    <span className='CPTienda-separador-badge'>EduCapsulas</span>
                </div>
                <CPTEduCapsulas
                    monedas={monedas}
                    setMonedas={setMonedas}
                    onCompra={(numGiros) => setGiros(numGiros)}
                />
                <div className='CPTienda-separador'>
                    <span className='CPTienda-separador-badge'>EduFood</span>
                </div>
                <CPTEduFood monedas={monedas} setMonedas={setMonedas} />
            </div>
        </div>
    )
}

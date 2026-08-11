import { useState } from 'react'
import './CPEleccionLengua.css'
import PEJPalabras from './PEJuegosLengua/PEJPalabras/PEJPalabras'

export default function CPEleccionLengua({ onVolver }) {
    const [eleccion, setEleccion] = useState('seleccion')
    const [jugando, setJugando] = useState(false)

    const handleAtras = () => {
        if (eleccion === 'seleccion') onVolver()
        else setEleccion('seleccion')
    }

    return (
        <>
            {!jugando && <img className="CPJugar-iconoAtras" src="/icons/atras.png" alt="" onClick={handleAtras} />}

            <div className={`CPEleccionMatematicas-contenedorTargetas ${eleccion === 'seleccion' ? 'CPEleccionMatematicas--destapado' : 'CPEleccionMatematicas--tapado'}`}>
                {/* <div className='CPEleccionMatematicas-targetaClase' id='CPEleccionLengua-operaciones' onClick={() => setEleccion('operaciones')}>
                    Sopa de letras
                </div> */}
                <div className='CPEleccionMatematicas-targetaClase' id='CPEleccionLengua-problemas' onClick={() => setEleccion('problemas')}>
                    Palabras
                </div>
            </div>

            <div className={`CPEleccionMatematicas-contenedorSubseccion ${eleccion === 'problemas' ? 'CPEleccionMatematicas--destapado' : 'CPEleccionMatematicas--tapado'}`}>
                <PEJPalabras onJugando={setJugando} />
            </div>
        </>
    )
}

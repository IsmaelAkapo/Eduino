import { useState } from 'react'
import './CPEleccionGeografia.css'
import PEJTestGeo from './PEJuegosGeografia/PEJTestGeo/PEJTestGeo'

export default function CPEleccionGeografia({ onVolver }) {
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
                <div className='CPEleccionMatematicas-targetaClase' id='CPEleccionGeografia-test' onClick={() => setEleccion('test')}>
                    Capitales
                </div>
            </div>

            <div className={`CPEleccionMatematicas-contenedorSubseccion ${eleccion === 'test' ? 'CPEleccionMatematicas--destapado' : 'CPEleccionMatematicas--tapado'}`}>
                <PEJTestGeo onJugando={setJugando} />
            </div>
        </>
    )
}

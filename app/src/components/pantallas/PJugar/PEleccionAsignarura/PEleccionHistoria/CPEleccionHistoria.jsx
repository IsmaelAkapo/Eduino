import { useState } from 'react'
import './CPEleccionHistoria.css'
import PEJTestHistoria from './PEJuegosHistoria/PEJTestHistoria/PEJTestHistoria'

export default function CPEleccionHistoria({ onVolver }) {
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
                <div className='CPEleccionMatematicas-targetaClase' id='CPEleccionHistoria-test' onClick={() => setEleccion('test')}>
                    Historia
                </div>
            </div>

            <div className={`CPEleccionMatematicas-contenedorSubseccion ${eleccion === 'test' ? 'CPEleccionMatematicas--destapado' : 'CPEleccionMatematicas--tapado'}`}>
                <PEJTestHistoria onJugando={setJugando} />
            </div>
        </>
    )
}

import { useState } from 'react'
import './CPEleccionMatematicas.css'
import PEJOperaciones from './PEJuegosMates/PEJOperaciones/PEJOperaciones'
import PEJProblemas from './PEJuegosMates/PEJProblemas/PEJProblemas'

export default function CPEleccionMatematicas({ onVolver }) {
    const [eleccion, setEleccion] = useState('seleccion')
    const [jugando, setJugando] = useState(false)

    const handleAtras = () => {
        if (eleccion === 'seleccion') onVolver()
        else setEleccion('seleccion')
    }

    return (
        <>
            {!jugando && <img className="CPJugar-iconoAtras" src="/icons/atras.png" alt="" onClick={handleAtras} />}

            <div className={`CPEleccionMatematicas-contenedorTargetas ${eleccion === 'seleccion' ? "CPEleccionMatematicas--destapado" : "CPEleccionMatematicas--tapado"}`}>
                <div className='CPEleccionMatematicas-targetaClase' id='CPEleccionMatematicas-operaciones' onClick={() => setEleccion('operaciones')}>
                    Operaciones
                </div>
                <div className='CPEleccionMatematicas-targetaClase' id='CPEleccionMatematicas-problemas' onClick={() => setEleccion('problemas')}>
                    Problemas
                </div>
            </div>

            <div className={`CPEleccionMatematicas-contenedorSubseccion ${eleccion === 'operaciones' ? "CPEleccionMatematicas--destapado" : "CPEleccionMatematicas--tapado"}`}>
                <PEJOperaciones onJugando={setJugando}/>
            </div>

            <div className={`CPEleccionMatematicas-contenedorSubseccion ${eleccion === 'problemas' ? "CPEleccionMatematicas--destapado" : "CPEleccionMatematicas--tapado"}`}>
                <PEJProblemas onJugando={setJugando}/>
            </div>
        </>
    )
}

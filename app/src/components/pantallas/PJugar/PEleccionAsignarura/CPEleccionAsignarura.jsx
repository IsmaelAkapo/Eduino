import './CPEleccionAsignarura.css'

export default function CPEleccionAsignarura({ onSeleccionar }) {
    return (
        <div className='CPEleccionAsignarura-contenedorClases'>
            <div className='CPEleccionAsignarura-targetaClase' id='CPEleccionAsignarura-lengua' onClick={() => onSeleccionar('lengua')}>
                Lengua
            </div>
            <div className='CPEleccionAsignarura-targetaClase' id='CPEleccionAsignarura-matematicas' onClick={() => onSeleccionar('matematicas')}>
                Matemáticas
            </div>
            {/* <div className='CPEleccionAsignarura-targetaClase' id='CPEleccionAsignarura-ingles' onClick={() => onSeleccionar('ingles')}>
                Inglés
            </div> */}
            <div className='CPEleccionAsignarura-targetaClase' id='CPEleccionAsignarura-geografia' onClick={() => onSeleccionar('geografia')}>
                Geografía
            </div>
            <div className='CPEleccionAsignarura-targetaClase' id='CPEleccionAsignarura-historia' onClick={() => onSeleccionar('historia')}>
                Historia
            </div>
        </div>
    )
}

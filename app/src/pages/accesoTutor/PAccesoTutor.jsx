import CBVueltaAtras from '../../components/botones/BVueltaAtras/CBVueltaAtras'
import CLTutor from '../../components/login/LTutor/CLTutor'
import CPiePagina from '../../components/piePagina/CPiePagina'
import './PAccesoTutor.css'

export default function PAccesoTutor() {
    
    return (
        <>
            <div className='PAccesoTutor-contenido'>
                <div className='PAccesoTutor-contenedorEncabezado'>
                    <CBVueltaAtras destino={'/'} />
                    <img src="/Logo_Iconos_Eduino/Eduino_Logo_Azul.png" alt="" />
                </div>
                <div className='PAccesoTutor-contenedorLogin'>
                    <CLTutor/>
                </div>
            </div>
            <CPiePagina/>
        </>
    )
}

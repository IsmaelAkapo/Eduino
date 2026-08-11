import CLNenes from '../../components/login/LNenes/CLNenes'
import CBVueltaAtras from '../../components/botones/BVueltaAtras/CBVueltaAtras'
import CPiePagina from '../../components/piePagina/CPiePagina'

import './PAccesoNene.css'

export default function PAccesoNene() {
  return (
    <>
        <div className='PAccesoNene-contenido'>
            <div className='PAccesoNene-contenedorEncabezado'>
                <CBVueltaAtras destino={ '/'}/>
                <img src="/Logo_Iconos_Eduino/Eduino_Logo_Azul.png" alt="" />
            </div>
            <div className='PAccesoNene-contenedorLogin'>
                <CLNenes/>
            </div>
        </div>
        <CPiePagina/>
    </>
  )
}

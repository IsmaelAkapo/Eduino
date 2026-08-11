import { useNavigate } from 'react-router-dom'
import './CBVueltaAtras.css'

export default function CBVueltaAtras({destino}) {
  const navegar = useNavigate()
  return (
    <>
    <div onClick={() => navegar(destino)}>
        <img className="CBVueltaAtras-botonImagen" src="icons/atras.png" alt="" />
    </div>
    </>
  )
}

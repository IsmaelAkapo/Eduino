import { useNavigate } from 'react-router-dom'
import './CBSesion.css'

export default function CBSesion() {

  const navigate = useNavigate()

  const irAccesoNene = () => {
    navigate('/accesoNene')
  }

  const irAccesoTutor = () => {
    navigate('/accesoTutor')
  }

  return (
    <>
        <div className='CBSesion-contenedorBotones'>
            <p onClick={irAccesoNene}>Acceso para niños</p>
            <p onClick={irAccesoTutor}>Acceso para tutores</p>
        </div>
    </>
  )
}

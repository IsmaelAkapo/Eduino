import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CBIniciarGoogle from '../../botones/BInciarGoogle/CBIniciarGoogle'
import { loginTutor } from '../../../services/STutor'


import './CLTutor.css'

export default function CLTutor() {

    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [errorVacio, setErrorVacio] = useState('');
    const [errorCUCO, setErrorCUCO] = useState('');
    const [errorKey, setErrorKey] = useState(0);

    const navigate = useNavigate()
    
    const onClickLogin = async () => {
        setErrorVacio('');
        setErrorCUCO('');
        setErrorKey(k => k + 1);

        if (!email || !contra) {
            setErrorVacio('Rellena todos los campos');
            return;
        }

        try {
            const datos = await loginTutor(email, contra);
            sessionStorage.setItem("id_tutor", datos.data.id_tutor)
            sessionStorage.setItem("nombre_tutor", datos.data.nombre)
            navigate('/manager')
        } catch (err) {
            setErrorCUCO(err.message);
        }

        
    };


    return (
        <>
            <div className='CLTutor-contenedorIniciarSesion'>
                <div className='CLTutor-encabezado'>
                    <img className='CLTutor-encabezado-icono' src="/imagenes/candado.png" alt="" />
                    <h2 className='CLTutor-titulo'>Acceso tutores</h2>
                </div>
                <div className='CLTutor-contenedorInputs'>
                    <p>Correo del tutor</p>
                    <input type="text" name='email' id='CLTutor-inputEmail' value={email} onChange={ (e) => setEmail(e.target.value)}/>
                    <p>Contraseña del tutor</p>
                    <input type="password" name='contra' id='CLTutor-inputContra' value={contra} onChange={ (e) => setContra(e.target.value)} />
                    <p key={`vacio-${errorKey}`} id='CLTutor-errorVacio' className={`CLTutor-textoError${errorVacio ? ' CLTutor-textoError--visible' : ''}`}>{errorVacio}</p>
                    <p key={`cuco-${errorKey}`} id='CLTutor-errorCUCO' className={`CLTutor-textoError${errorCUCO ? ' CLTutor-textoError--visible' : ''}`}>{errorCUCO}</p>
                </div>
                <div className='CLTutor-contenedorBotones'>
                    <div className='CLTutor-contenedorBotonesExternos'>
                        <CBIniciarGoogle />
                    </div>
                    <p className='CLTutor-boton'
                        id='CLTutor-botonEntrar'
                        onClick={onClickLogin}>
                        ¡¡¡Entrar!!!
                    </p>
                </div>
            </div>
        </>
    )
}

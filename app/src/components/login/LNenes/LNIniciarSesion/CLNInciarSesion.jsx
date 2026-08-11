import './CLNInciarSesion.css'
import CBIniciarGoogle from '../../../botones/BInciarGoogle/CBIniciarGoogle'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../../../../services/SNenes';

export default function CLNInciarSesion() {

    const [apodo, setApodo] = useState('');
    const [contra, setContra] = useState('');
    const [errorVacio, setErrorVacio] = useState('');
    const [errorCUCO, setErrorAPCO] = useState('');
    const [errorKey, setErrorKey] = useState(0);

    const navigate = useNavigate()

    const onClickLogin = async () => {
        setErrorVacio('');
        setErrorAPCO('');
        setErrorKey(k => k + 1);


         if (!apodo || !contra) {
            setErrorVacio('Rellena todos los campos');
            return;
        }

        try {
            const datos = await iniciarSesion(apodo, contra);
            sessionStorage.setItem("id_nene", datos.data.id_nene)
            sessionStorage.setItem("apodo", datos.data.apodo)
            navigate('/indexNene')
        } catch (err) {
            setErrorAPCO(err.message);
        }
    }   

    return (
        <>
            <div className='CLNInciarSesion-contenedorIniciarSesion'>
                <div className='CLNInciarSesion-contenedorInputs'>
                    <p>Apodo del niño</p>
                    <input type="text" name='apodo' id='CLNInicarSesion-inputApodo' value={apodo} onChange={(e) => setApodo(e.target.value)} />
                    <p>Contraseña del tutor</p>
                    <input type="password" name='contra' id='CLNInicarSesion-inputContra' value={contra} onChange={(e) => setContra(e.target.value)}/>
                    <p key={`vacio-${errorKey}`} id='CLNInciarSesion-errorVacio' className={`CLNInciarSesion-textoError${errorVacio ? ' CLNInciarSesion-textoError--visible' : ''}`}>{errorVacio}</p>
                    <p key={`cuco-${errorKey}`} id='CLNInciarSesion-errorCUCO' className={`CLNInciarSesion-textoError${errorCUCO ? ' CLNInciarSesion-textoError--visible' : ''}`}>{errorCUCO}</p>
                </div>
                <div className='CLNInciarSesion-contenedorBotones'>
                    <div className='CLNInciarSesion-contenedorBotonesExternos'>
                        <CBIniciarGoogle />
                    </div>
                    <p className='CLNInciarSesion-boton'
                        id='CLNInciarSesion-botonEntrar'
                        onClick={onClickLogin}
                        >
                        ¡¡¡Entrar!!!
                    </p>
                </div>
            </div>
        </>
    )
}

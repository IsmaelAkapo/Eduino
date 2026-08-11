import { useState } from 'react'

import './CLNenes.css'
import CLNInciarSesion from './LNIniciarSesion/CLNInciarSesion'
import CLNCrearCuenta from './LNCrearCuenta/CLNCrearCuenta'
import CLNAnadirPerfil from './LNAnadirPerfil/CLNAnadirPerfil'

export default function CLNenes() {

    const [activo, setActivo] = useState('login')

    return (
        <>
            <div className="CLNenes-contenedorTodosLosLogins">
                <div className="CLNenes-contendorIniCreAna">
                    <div className='CLNenes-encabezado'>
                        <img className='CLNenes-encabezado-icono' src="/imagenes/estrella.png" alt="" />
                    </div>
                    <div className='CLNenes-contenedorBotonesFormularios'>
                        <div
                            id='CLNenes-pastilla'
                            className={activo === 'registro' ? 'pastilla-centro' : activo === 'perfil' ? 'pastilla-derecha' : ''}
                        />
                        <div
                            className={`CLNenes-botonEleccionFormulario${activo === 'login' ? ' CLNenes-botonEleccionFormulario--activo' : ''}`}
                            id='CLNenes-botonLo'
                            onClick={() => setActivo('login')}
                        >
                            Inicio sesión
                        </div>
                        <div
                            className={`CLNenes-botonEleccionFormulario${activo === 'registro' ? ' CLNenes-botonEleccionFormulario--activo' : ''}`}
                            id='CLNenes-botonRe'
                            onClick={() => setActivo('registro')}
                        >
                            Crear cuenta
                        </div>
                        <div
                            className={`CLNenes-botonEleccionFormulario${activo === 'perfil' ? ' CLNenes-botonEleccionFormulario--activo' : ''}`}
                            id='CLNenes-botonPe'
                            onClick={() => setActivo('perfil')}
                        >
                            Añadir perfil
                        </div>
                    </div>
                    <div className='CLNenes-contenedorInputsBotones'>
                        {activo === 'login' && (
                            <div className='CLNenes-contenedorIniciarSesion'>
                                <CLNInciarSesion />
                            </div>
                        )}
                        {activo === 'registro' && (
                            <div className='CLName-contenedorCrearCuenta'>
                                <CLNCrearCuenta />
                            </div>
                        )}
                        {activo === 'perfil' && (
                            <div className='CLName-contenedorAnadirCuenta'>
                                <CLNAnadirPerfil />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

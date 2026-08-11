import React, { useEffect, useState } from 'react'
import { datosNene } from '../../../services/SPerfil'
import './CPPerfil.css'

export default function CPPerfil() {

    const [nene, setNene] = useState(null)
    const id_nene = sessionStorage.getItem('id_nene')

    useEffect(() => {
        datosNene(id_nene).then(setNene).catch(console.error)
    }, [])

    if (!nene) return <div className='CPPerfil-cargando'>Cargando...</div>

    const monedasGastadas = nene.monedas_gastadas_comida + nene.monedas_gastadas_capsulas + nene.monedas_gastadas_eduinos

    return (
        <div className='CPPerfil-contenedor'>
            <div className='CPPerfil-cabecera'>
                <div className='CPPerfil-avatar'>
                    {nene.foto
                        ? <img src={nene.foto} alt='foto de perfil' />
                        : <img src='/icons/sin_foto.jpg' alt='foto de perfil' />
                    }
                </div>
                <div className='CPPerfil-cabeceraInfo'>
                    <h2 className='CPPerfil-apodo'>{nene.apodo}</h2>
                    <p className='CPPerfil-nombre'>{nene.nombre}</p>
                    <span className='CPPerfil-nivel'>{nene.nivel}</span>
                </div>
            </div>

            {/* Stats principales */}
            <div className='CPPerfil-stats'>
                <div className='CPPerfil-statCard'>
                    <img src='/imagenes/eduinos/eduino_objetos/EduCoin.png' alt='' />
                    <p className='CPPerfil-statValor'>{nene.monedas_actual}</p>
                    <p className='CPPerfil-statLabel'>Monedas</p>
                </div>
                <div className='CPPerfil-statCard'>
                    <img src='/imagenes/trofeo.png' alt='' />
                    <p className='CPPerfil-statValor'>{nene.trofeos_actual}</p>
                    <p className='CPPerfil-statLabel'>Trofeos</p>
                </div>
                <div className='CPPerfil-statCard'>
                    <img src='/imagenes/imagenes_index/medalla.png' alt='' />
                    <p className='CPPerfil-statValor'>{nene.logros_conseguidos}</p>
                    <p className='CPPerfil-statLabel'>Logros</p>
                </div>
                <div className='CPPerfil-statCard'>
                    <img src='/imagenes/eduinos/eduino_icono/Lunox.png' alt='' />
                    <p className='CPPerfil-statValor'>{nene.numero_eduinos_total}</p>
                    <p className='CPPerfil-statLabel'>Eduinos</p>
                </div>
            </div>

            <div className='CPPerfil-seccion'>
                <h3 className='CPPerfil-seccionTitulo'>Actividad académica</h3>
                <div className='CPPerfil-filas'>
                    <div className='CPPerfil-fila'>
                        <span>Ejercicios de lengua</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_ejercicios_lengua}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Sopas de letras</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_de_sopas}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Palabras encontradas</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_de_palabras_encontradas}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Ejercicios de matemáticas</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_ejercicios_matematicas}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Operaciones</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_de_operaciones}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Problemas</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_de_problemas}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Ejercicios de geografía</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_ejercicios_geografia}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Capitales adivinadas</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_capitales_adivinadas}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Ejercicios de historia</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_ejercicios_historia}</span>
                    </div>
                    <div className='CPPerfil-fila'>
                        <span>Tests de historia</span>
                        <span className='CPPerfil-filaValor'>{nene.numero_test_historia}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

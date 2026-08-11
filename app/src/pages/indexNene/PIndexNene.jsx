import { useState, useEffect } from 'react'
import { traerImagen } from '../../services/SNenes'
import { useNavigate } from 'react-router-dom'

import CPEduinos from '../../components/pantallas/PEduinos/CPEduinos'
import CPNLogros from '../../components/pantallas/PLogros/CPLogros'

import './PIndexNene.css'
import CPTienda from '../../components/pantallas/PTienda/CPTienda'
import CPMercado from '../../components/pantallas/PMercado/CPMercado'
import CPJugar from '../../components/pantallas/PJugar/CPJugar'
import CPPerfil from '../../components/pantallas/PPerfil/CPPerfil'
import CPRankin from '../../components/pantallas/PRankin/CPRankin'
export default function PIndexNene() {
  
  const id_nene = sessionStorage.getItem('id_nene')

  const [imagen , setImagen] = useState('')
  const [eduinoParaVender, setEduinoParaVender] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    traerImagen(id_nene).then(data => setImagen(data.foto))
  }, [])

  const [activo, setActivo] = useState('jugar')
  const [keys, setKeys] = useState({ jugar: 0, tienda: 0, eduinos: 0, logros: 0, perfil: 0, lengua: 0, matematicas: 0, mercado: 0, rankin: 0 })
  function irA(tab) {
    setActivo(tab)
    setKeys(prev => ({ ...prev, [tab]: prev[tab] + 1 }))
  }
  
  function salir(){
    sessionStorage.clear()
    navigate('/')
  }
  
  return (
    <>
      <div className='PIndexNene-contenedorParaApp'>
        <div className='PIndexNene-contenedorEncabezadoLateral'>
          <div>
            <img src="/Logo_Iconos_Eduino/Eduino_Logo_Blanco.png" alt="" />
          </div>
          <div className='PIndexNene-fotoPerfil' onClick={() => irA('perfil')}>
            <img src={imagen || '/icons/sin_foto.jpg'} alt="" />
          </div>
          <div className={`PIndexNene-botonesEncabezadoLateral ${activo === 'jugar' ? 'PIndexNene-botonPresionado' : ''}`} onClick={() => irA('jugar')}>
            Jugar
          </div>
          <div className={`PIndexNene-botonesEncabezadoLateral ${activo === 'tienda' ? 'PIndexNene-botonPresionado' : ''}`} onClick={() => irA('tienda')}>
            Tienda
          </div>
          <div className={`PIndexNene-botonesEncabezadoLateral ${activo === 'eduinos' ? 'PIndexNene-botonPresionado' : ''}`} onClick={() => irA('eduinos')}>
            Eduinos
          </div>
          <div className={`PIndexNene-botonesEncabezadoLateral ${activo === 'mercado' ? 'PIndexNene-botonPresionado' : ''}`} onClick={() => irA('mercado')}>
            Mercado
          </div>
          <div className={`PIndexNene-botonesEncabezadoLateral ${activo === 'logros' ? 'PIndexNene-botonPresionado' : ''}`} onClick={() => irA('logros')}>
            Logros
          </div>
          <div className={`PIndexNene-botonesEncabezadoLateral ${activo === 'rankin' ? 'PIndexNene-botonPresionado' : ''}`} onClick={() => irA('rankin')}>
            Ranking
          </div>
          <div onClick={() => salir()} className='PIndexNene-botonesEncabezadoLateral-salir'>
            Salir
          </div>
        </div>
        <div className='PIndexNene-contenedorIndex'>
          {/* Perfil */}
          <div className={`PIndexNene-contenedorPantallas${activo === "perfil" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
              <CPPerfil key={keys.perfil}/>
          </div >
          {/* Jugar */}
            <div className={`PIndexNene-contenedorPantallas${activo === "jugar" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
              <CPJugar key={keys.jugar}/>
          </div >

          {/* Eduinos */}
          <div className={`PIndexNene-contenedorPantallas${activo === "eduinos" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
              <CPEduinos key={keys.eduinos} irA={irA} setEduinoParaVender={setEduinoParaVender}/>
          </div >
          {/* Tienda */}
          <div className={`PIndexNene-contenedorPantallas${activo === "tienda" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
            <CPTienda key={keys.tienda} irA={irA}/>
          </div>
          {/*  */}
          {/* Mercado */}
          <div className={`PIndexNene-contenedorPantallas${activo === "mercado" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
            <CPMercado key={keys.mercado} irA={irA} eduinoParaVender={eduinoParaVender} setEduinoParaVender={setEduinoParaVender}/>
          </div>
          {/*  */}
          {/* Logros */}
          <div className={`PIndexNene-contenedorPantallas${activo === "logros" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
            <CPNLogros key={keys.logros} />
          </div>
          {/* Rankin */}
          <div className={`PIndexNene-contenedorPantallas${activo === "rankin" ? " PIndexNene-contenedorPantallas--activo" : ""}`}
              id='PIndexNene-contenedorEduino'>
            <CPRankin key={keys.rankin} irA={irA} />
          </div>
        </div>
      </div>
    </>
  )
}

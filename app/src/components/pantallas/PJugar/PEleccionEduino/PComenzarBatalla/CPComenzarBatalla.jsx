import { useState } from 'react'
import CPBatalla from './PBatalla/CPBatalla'
import './CPComenzarBatalla.css'

export default function CPComenzarBatalla({ eduino, onVolver, onEnBatalla }) {
  const [enBatalla, setEnBatalla] = useState(false)

  const mejorCopia = eduino?.copias?.length
    ? eduino.copias.reduce((best, c) => c.nivel > best.nivel ? c : best, eduino.copias[0])
    : null

  const nivel       = mejorCopia?.nivel ?? 1
  const vidaActual  = mejorCopia?.vida_actual  ?? eduino?.vida   ?? 0
  const fuerzaActual= mejorCopia?.fuerza_actual ?? eduino?.fuerza ?? 0
  const vidaMax     = eduino ? eduino.vida   + nivel * Math.round(eduino.vida   * 0.2) : 1
  const fuerzaMax   = eduino ? eduino.fuerza + Math.round(eduino.fuerza * 0.5)         : 1

  const pctVida   = Math.min((vidaActual   / vidaMax)   * 100, 100)
  const pctFuerza = Math.min((fuerzaActual / fuerzaMax) * 100, 100)

  if (enBatalla) {
    return <CPBatalla eduino={eduino} onVolver={onVolver} />
  }

  return (
    <div className='CPComenzarBatalla-contenedorConfirmacion'>

      <div className='CPComenzarBatalla-cabecera'>
        <img src={eduino?.imagen_eduino} alt="" />
        <p className='CPComenzarBatalla-nombre'>{eduino?.nombre}</p>
        <span className='CPComenzarBatalla-nivel'>Nv. {nivel}</span>
      </div>

      <div className='CPComenzarBatalla-contenedorStatsGrande'>

        <div className='CPComenzarBatalla-contenedorStats'>
          <img src="/icons/vida.png" alt="vida" />
          <div className='CPComenzarBatalla-statDetalle'>
            <p>{vidaActual}/{vidaMax}</p>
            <div className='CPComenzarBatalla-barraFondo'>
              <div
                className='CPComenzarBatalla-barraRelleno CPComenzarBatalla-barraVida'
                style={{ width: `${pctVida}%` }}
              />
            </div>
          </div>
        </div>

        <div className='CPComenzarBatalla-contenedorStats'>
          <img src="/icons/fuerza.png" alt="fuerza" />
          <div className='CPComenzarBatalla-statDetalle'>
            <p>{fuerzaActual}/{fuerzaMax}</p>
            <div className='CPComenzarBatalla-barraFondo'>
              <div
                className='CPComenzarBatalla-barraRelleno CPComenzarBatalla-barraFuerza'
                style={{ width: `${pctFuerza}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      <div className='CPComenzarBatalla-contenedorBotonesConfirmacion'>
        <p onClick={() => { setEnBatalla(true); onEnBatalla?.(true) }}>Comenzar batalla</p>
      </div>

    </div>
  )
}

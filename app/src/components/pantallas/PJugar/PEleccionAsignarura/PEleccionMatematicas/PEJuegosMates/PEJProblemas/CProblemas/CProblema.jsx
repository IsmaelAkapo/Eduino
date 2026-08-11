import { useState } from 'react'
import './CProblema.css'

export default function CProblema({ pregunta, onElegir }) {
    const [valor, setValor]       = useState('')
    const [estado, setEstado]     = useState(null) // null | 'correcta' | 'incorrecta'

    function confirmar() {
        if (estado || valor.trim() === '') return
        const esCorrecta = parseInt(valor, 10) === pregunta.respuesta_numero
        setEstado(esCorrecta ? 'correcta' : 'incorrecta')
        setTimeout(() => onElegir(esCorrecta), 1200)
    }

    function manejarTecla(e) {
        if (e.key === 'Enter') confirmar()
    }

    return (
        <>
            <div className='CProblema-enunciado'>
                <p>{pregunta.enunciado}</p>
            </div>

            <div className='CProblema-respuesta'>
                <input
                    className={`CProblema-input${estado ? ` CProblema-input--${estado}` : ''}`}
                    type='number'
                    placeholder='Tu respuesta...'
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    onKeyDown={manejarTecla}
                    disabled={!!estado}
                    autoFocus
                />
                <button
                    className={`CProblema-btn${estado ? ` CProblema-btn--${estado}` : ''}`}
                    onClick={confirmar}
                    disabled={!!estado || valor.trim() === ''}
                >
                    {estado === 'correcta'   ? '¡Correcto!' :
                     estado === 'incorrecta' ? `Era ${pregunta.respuesta_numero}` :
                     'Confirmar'}
                </button>
            </div>
        </>
    )
}

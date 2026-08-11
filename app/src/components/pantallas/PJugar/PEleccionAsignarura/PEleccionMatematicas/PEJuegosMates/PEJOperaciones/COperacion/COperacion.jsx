import './COperacion.css'

const LETRAS      = ['A', 'B', 'C', 'D']
const OPCION_KEYS = ['opcion_a', 'opcion_b', 'opcion_c', 'opcion_d']

export default function COperacion({ pregunta, respuestaElegida, onElegir }) {
  const opciones = LETRAS.map((letra, i) => ({ letra, texto: pregunta[OPCION_KEYS[i]] }))

  return (
    <>
      <div className='COperacion-pregunta'>
        <h2>{pregunta.primer_operador} {pregunta.operacion} {pregunta.segundo_operador} = ?</h2>
      </div>

      <div className='COperacion-opciones'>
        {opciones.map(({ letra, texto }) => {
          let clase = 'COperacion-opcion'
          if (respuestaElegida) {
            if (letra === pregunta.respuesta)  clase += ' COperacion-opcion--correcta'
            else if (letra === respuestaElegida) clase += ' COperacion-opcion--incorrecta'
          }
          return (
            <div key={letra} className={clase} onClick={() => onElegir(letra)}>
              <span className='COperacion-opcionLetra'>{letra}</span>
              <span>{texto}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

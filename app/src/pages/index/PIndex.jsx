import { useState } from 'react'
import './PIndex.css'
import CBSesion from '../../components/botones/BSesion/CBSesion'
import CPiePagina from '../../components/piePagina/CPiePagina'

export default function PIndex() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const scrollSeccion = (id) => {
    const encabezado = document.getElementById('PIndex-Encabezado')
    const el = document.getElementById(id)
    const top = el.getBoundingClientRect().top + window.scrollY - encabezado.offsetHeight - 50
    window.scrollTo({ top, behavior: 'smooth'})

  }

  const onScrollEduino = () => scrollSeccion('queEsEduino')
  const onScrollActividades = () => scrollSeccion('lasActividades')
  const onScrollLogros = () => scrollSeccion('losLogros')
  const onScrollSeguridad = () => scrollSeccion('laSeguridad')
  const onScrollTutores = () => scrollSeccion('paraLosPadres')
  
  return (
    <>
      <div className="PIndex-ContenedorEncabezado" id='PIndex-Encabezado'>
        <img onClick={() => setMenuAbierto(!menuAbierto)} src="/Logo_Iconos_Eduino/Eduino_Logo_Blanco.png" alt="Logo de Eduino" />
        <div className={`PIndex-ConenedorEnlaces ${menuAbierto ? 'abierto' : ''}`}>
          <p onClick={onScrollEduino}>
            ¿Qué es <span className='PIndex-PalabraDestacadaAzul'>Eduino</span>?
          </p>
          <p onClick={onScrollActividades}>
            ¿Qué tipo de <span className='PIndex-PalabraDestacadaAzul'>actividades</span> hay?
          </p>
          <p onClick={onScrollLogros}>
            ¿Cómo se ganan <span className='PIndex-PalabraDestacadaAzul'>logros</span>?
          </p>
          <p onClick={onScrollSeguridad}>
            ¿Es <span className='PIndex-PalabraDestacadaAzul'>seguro</span> para mis hijos?
          </p>
          <p onClick={onScrollTutores}>
            ¿Qué pueden hacer los <span className='PIndex-PalabraDestacadaAzul'>padres</span>?
          </p>
        </div>
      </div>

      <div className='PIndex-ContenedorMain'>
        <div className='PIndex-PrimeraVista'>
          <div className='PIndex-ContenedorTextoBotones'>
            <div className='PIndex-ContenedorTextoPrimeraVista'>
              <h1 className="hero-title">
                Aprende,<br />
                <span className="highlight">juega</span> y<br />
                <span className="blue">crece</span>
              </h1>
              <p className="hero-desc">
                Una plataforma educativa donde las matemáticas, la lectura, las ciencias y mucho más se convierten en la aventura más divertida del día. Gana estrellas, supera retos y descubre hasta dónde puedes llegar.
              </p>
            </div>
            <div className='PIndex-ContenedorBotones'>
              <img className='PIndex-ImagenMovil' src="/Logo_Iconos_Eduino/Eduino_Icono.png" alt="" />
              <CBSesion />
            </div>
          </div>
          <img className='PIndex-ImagenPC' src="/Logo_Iconos_Eduino/Eduino_Icono.png" alt="" />
        </div>
        <div className='PIndex-ContenedorInformativo'>
          <div className='PIndex-ContenedorTargetasInfo'>

            <div className="PIndex-contenedorInfo" id="queEsEduino">
              <h2>¿Qué es <span className="PIndex-PalabraDestacadaAzul">Eduino</span>?</h2>
              <div className='PIndex-barraEspaciadora'></div>
              <div className="PIndex-contenedorInterior derecha">
                <img src="imagenes/imagenes_index/niños.png" alt="" />
                <p>
                  Eduino es una plataforma educativa diseñada especialmente para niños de <span className="PIndex-keyword">3 a 12 años</span>.
                  Nuestro objetivo es convertir el aprendizaje en una experiencia <span className="PIndex-keyword">divertida y motivadora</span>,
                  donde los pequeños desarrollen <span className="PIndex-keyword">habilidades reales</span> sin darse cuenta de que están estudiando.
                  <span className="PIndex-keyword">Actividades interactivas</span>, <span className="PIndex-keyword">logros coleccionables</span> y un entorno <span className="PIndex-keyword">100% seguro</span>: todo en un mismo lugar.
                </p>
              </div>
            </div>

            <div className="PIndex-contenedorInfo" id="lasActividades">
              <h2>Las <span className="PIndex-PalabraDestacadaAzul">actividades</span></h2>
              <div className='PIndex-barraEspaciadora'></div>
              <div className="PIndex-contenedorInterior derecha">
                <p>
                  Más de <span className="PIndex-keyword">500 actividades interactivas</span> repartidas en <span className="PIndex-keyword">6 áreas del conocimiento</span>: matemáticas,
                  lengua, ciencias, arte, música e inglés. Cada actividad se <span className="PIndex-keyword">adapta automáticamente</span> al nivel
                  del niño, asegurando que los retos sean siempre alcanzables pero emocionantes.
                  Nunca se acaban las aventuras en Eduino.
                </p>
                <img src="/imagenes/imagenes_index/cerebro.png" alt="" />
              </div>
            </div>

            <div className="PIndex-contenedorInfo" id="losLogros">
              <h2>Los <span className="PIndex-PalabraDestacadaAzul">logros</span></h2>
              <div className='PIndex-barraEspaciadora'></div>
              <div className="PIndex-contenedorInterior derecha">
                <img src="/imagenes/imagenes_index/medalla.png" alt="" />
                <p>
                  Cada actividad completada suma <span className="PIndex-keyword">estrellas</span> y desbloquea <span className="PIndex-keyword">insignias únicas</span> que el niño
                  colecciona en su perfil. Los logros reconocen el <span className="PIndex-keyword">esfuerzo</span>, celebran el <span className="PIndex-keyword">progreso</span> y
                  mantienen viva la <span className="PIndex-keyword">motivación</span> para seguir aprendiendo. Cuanto más se practica,
                  más crece la colección y más especial se vuelve la aventura.
                </p>
              </div>
            </div>

            <div className="PIndex-contenedorInfo" id="laSeguridad">
              <h2>Nuestra <span className="PIndex-PalabraDestacadaAzul">seguridad</span></h2>
              <div className='PIndex-barraEspaciadora izquierda'></div>
              <div className="PIndex-contenedorInterior">
                <p>
                  En Eduino la <span className="PIndex-keyword">seguridad</span> de los más pequeños es la <span className="PIndex-keyword">prioridad</span>. La plataforma <span className="PIndex-keyword">no contiene
                  publicidad</span>, enlaces externos ni <span className="PIndex-keyword">contenido inapropiado</span>. Todo el contenido está revisado
                  y pensado para que los niños naveguen con <span className="PIndex-keyword">total libertad</span>, y para que los padres puedan
                  estar completamente tranquilos. Un espacio diseñado solo para ellos.
                </p>
                <img src="/imagenes/imagenes_index/escudo.png" alt="" />
              </div>
            </div>

            <div className="PIndex-contenedorInfo" id="paraLosPadres">
              <h2>Para <span className="PIndex-PalabraDestacadaAzul">padres y educadores</span></h2>
              <div className='PIndex-barraEspaciadora'></div>
              <div className="PIndex-contenedorInterior derecha">
                <img src="imagenes/imagenes_index/padres_tutores.png" alt="" />
                <p>
                  Desde el panel de padres puedes ver el <span className="PIndex-keyword">progreso de tus hijos en tiempo real</span>: actividades
                  realizadas, <span className="PIndex-keyword">tiempo de uso</span>, áreas en las que destacan y en las que necesitan refuerzo.
                  También puedes ajustar los contenidos disponibles y establecer <span className="PIndex-keyword">límites de tiempo</span>.
                  Eduino es una herramienta tanto para el <span className="PIndex-keyword">hogar</span> como para el <span className="PIndex-keyword">aula</span>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <CPiePagina />
    </>
  )
}

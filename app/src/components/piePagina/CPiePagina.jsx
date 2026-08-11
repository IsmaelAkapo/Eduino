import './CPiePagina.css'

export default function CPiePagina() {
  return (
    <footer className="CPiePagina-footer">
      <div className="CPiePagina-inner">

        <div className="CPiePagina-marca">
          <img src="/Logo_Iconos_Eduino/Eduino_Logo_Blanco.png" alt="Eduino" className="CPiePagina-logo" />
          <p className="CPiePagina-tagline">Aprender jugando, crecer sonriendo</p>
        </div>

        <div className="CPiePagina-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Contacto</a>
        </div>

        <div className="CPiePagina-copy">
          <p>© 2026 AfroTek</p>
          <p className="CPiePagina-copy-sub">Todos los derechos reservados</p>
        </div>

      </div>
      <div className="CPiePagina-barra" />
    </footer>
  )
}

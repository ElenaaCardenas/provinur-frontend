import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-tag">
            Soluciones Industriales Especializadas
          </span>

          <h1>
            Impulsamos la industria con servicios de laboratorio,
            metrología e insumos de seguridad.
          </h1>

          <p>
            Ayudamos a empresas de todo el país con soluciones técnicas,
            equipamiento especializado y asesoría profesional.
          </p>

          <div className="hero-buttons">
            <Link to="/contacto" className="primary-btn">
                Solicitar cotización
            </Link>

            <a href="#services" className="secondary-btn">
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
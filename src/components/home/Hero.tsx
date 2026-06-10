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
            <button className="primary-btn">
              Solicitar Información
            </button>

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
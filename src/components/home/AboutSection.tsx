function AboutSection() {
  return (
    <section className="about-section">

      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Sobre Provinur"
        />
      </div>

      <div className="about-content">

        <span className="about-tag">
          SOBRE NOSOTROS
        </span>

        <h2>
          Soluciones industriales respaldadas por experiencia y conocimiento técnico.
        </h2>

        <p>
          En Provinur trabajamos para ofrecer servicios especializados,
          productos industriales e instrumentos de alta calidad para empresas
          que buscan confiabilidad, precisión y soporte profesional.
        </p>

        <div className="about-features">

          <div>✓ Atención especializada</div>

          <div>✓ Cobertura nacional</div>

          <div>✓ Soluciones para diferentes industrias</div>

          <div>✓ Asesoría técnica profesional</div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;
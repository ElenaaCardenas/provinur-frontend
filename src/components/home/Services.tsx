function Services() {
  return (
   <section id="services" className="services">
    
      <div className="section-title">
        <h2>Nuestros Servicios</h2>
        <p>
          Soluciones especializadas para la industria y el sector productivo.
        </p>
      </div>

      <div className="service-row">

        <div className="service-image">
          <img
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780"
            alt="Laboratorio Diésel"
          />
        </div>

        <div className="service-content">
          <h3>Laboratorio Diésel</h3>

          <p>
            Servicios especializados de diagnóstico, análisis y soporte
            técnico para sistemas y equipos diésel.
          </p>

          <button>Ver más</button>
        </div>

      </div>

      <div className="service-row reverse">

        <div className="service-image">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
            alt="Metrología"
          />
        </div>

        <div className="service-content">
          <h3>Metrología</h3>

          <p>
            Calibración, medición y control de instrumentos para asegurar
            precisión y cumplimiento normativo.
          </p>

          <button>Ver más</button>
        </div>

      </div>

      <div className="service-row">

        <div className="service-image">
          <img
            src="https://images.unsplash.com/photo-1581092335397-9583eb92d232"
            alt="Insumos de Seguridad"
          />
        </div>

        <div className="service-content">
          <h3>Insumos de Seguridad</h3>

          <p>
            Equipamiento y suministros diseñados para proteger al personal
            y garantizar operaciones seguras.
          </p>

          <button>Ver más</button>
        </div>

      </div>

    </section>
  );
}

export default Services;
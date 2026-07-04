import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

function Contact() {
  return (
    <section className="contact-page">
      
      <div className="contact-header">

        <span>CONTACTO</span>

        <h1>Solicita información o una cotización</h1>

        <p>
          Completa el siguiente formulario y uno de nuestros
          agentes se pondrá en contacto contigo a la
          brevedad.
        </p>

      </div>

      <div className="contact-container">
        <div className="contact-info">

          <h2>Información de contacto</h2>

          <div className="contact-item">
             <FaPhoneAlt className="contact-icon"/>
         <div>
            <strong>Teléfono</strong>
              <p>Zona sur: 9621842040</p>
          </div>
  </div>

  <div className="contact-item">
    <FaEnvelope className="contact-icon"/>
    <div>
      <strong>Correo</strong>
      <p>contacto@provinur.com</p>
    </div>
  </div>

  <div className="contact-item">
    <FaMapMarkerAlt className="contact-icon"/>
    <div>
      <strong>Cobertura</strong>
      <p>Envios a todo el país</p>
    </div>
  </div>

  <div className="contact-item">
    <FaClock className="contact-icon"/>
    <div>
      <strong>Horario</strong>
      <p>Lunes a Sábado<br/>8:00 AM - 6:00 PM</p>
    </div>
  </div>

</div>
        <form className="contact-form">

          <input
            type="text"
            placeholder="Nombre completo"
          />

          <input
            type="text"
            placeholder="Empresa (Opcional)"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
          />

          <input
            type="tel"
            placeholder="Teléfono"
          />

          <textarea
            rows={6}
            placeholder="Escribe tu mensaje..."
          ></textarea>

          <button type="submit">
            Solicitar información
          </button>

        </form>

      </div>
     
    </section>
  );
}

export default Contact;
import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

type ContactLocationState = {
  productName?: string;
};

function Contact() {
  const location = useLocation();

  const state = location.state as ContactLocationState | null;

  const productName = state?.productName ?? "";

  const initialMessage = productName
    ? `Hola, me interesa solicitar información y una cotización del siguiente producto:\n\n${productName}\n\nGracias.`
    : "";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productName,
    message: initialMessage,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    console.log("Datos del formulario:", formData);

    /*
      Más adelante enviaremos estos datos al backend:

      {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        productName: formData.productName,
        message: formData.message
      }
    */
  };

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
            <FaPhoneAlt className="contact-icon" />

            <div>
              <strong>Teléfono</strong>
              <p>Zona sur: 9621842040</p>
            </div>
          </div>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />

            <div>
              <strong>Correo</strong>
              <p>contacto@provinur.com</p>
            </div>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />

            <div>
              <strong>Cobertura</strong>
              <p>Envíos a todo el país</p>
            </div>
          </div>

          <div className="contact-item">
            <FaClock className="contact-icon" />

            <div>
              <strong>Horario</strong>

              <p>
                Lunes a sábado
                <br />
                8:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Empresa (opcional)"
            value={formData.company}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {productName && (
            <div className="contact-product-field">
              <label htmlFor="productName">
                Producto de interés
              </label>

              <input
                id="productName"
                type="text"
                name="productName"
                value={formData.productName}
                readOnly
              />
            </div>
          )}

          <textarea
            name="message"
            rows={6}
            placeholder="Escribe tu mensaje..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Solicitar información
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
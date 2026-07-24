import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/contact.css";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "success" | "error" | null
  >(null);

  const [submitMessage, setSubmitMessage] = useState("");

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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/contact-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.name.trim(),
            empresa: formData.company.trim() || undefined,
            correo: formData.email.trim(),
            telefono: formData.phone.trim(),
            mensaje: formData.productName
              ? `Producto solicitado: ${formData.productName}\n\n${formData.message.trim()}`
              : formData.message.trim(),
          }),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);

        console.error(
          "Respuesta del backend:",
          errorResponse,
        );

        throw new Error(
          "No fue posible enviar la solicitud",
        );
      }

      const savedRequest = await response.json();

      console.log("Solicitud guardada:", savedRequest);

      setSubmitStatus("success");

      setSubmitMessage(
        "Tu solicitud fue enviada correctamente. Nos pondremos en contacto contigo.",
      );

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        productName,
        message: initialMessage,
      });
    } catch (error) {
      console.error(
        "Error al enviar la solicitud:",
        error,
      );

      setSubmitStatus("error");

      setSubmitMessage(
        "No se pudo enviar la solicitud. Inténtalo nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
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

          {submitMessage && (
            <p
              className={`contact-submit-message ${
                submitStatus === "success"
                  ? "contact-submit-success"
                  : "contact-submit-error"
              }`}
              role={
                submitStatus === "success"
                  ? "status"
                  : "alert"
              }
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Enviando..."
              : "Solicitar información"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
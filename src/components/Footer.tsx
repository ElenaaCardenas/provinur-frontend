import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import logo from "../assets/PROVINUR LOGO 2026.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-column">

          <img
            src={logo}
            alt="Provinur"
            className="footer-logo"
          />

          <p>
            Soluciones Integrales para la Industria,
            ofreciendo servicios especializados de
            laboratorio, metrología e insumos de seguridad.
          </p>

        </div>

        <div className="footer-column">

          <h3>Empresa</h3>

          <Link to="/">Inicio</Link>

          <Link to="/nosotros">Nosotros</Link>

          <Link to="/productos">Productos</Link>

          <Link to="/contacto">Contacto</Link>

        </div>

        <div className="footer-column">

          <h3>Servicios</h3>

          <Link to="/laboratorio-diesel">Laboratorio</Link>

          <Link to="/metrologia">Metrología</Link>

          <Link to="/insumos-seguridad">
            Insumos de Seguridad
          </Link>

        </div>

        <div className="footer-column">

          <h3>Contacto</h3>

          <a href="#">
            <FaPhoneAlt /> Teléfono
          </a>

          <a href="#">
            <FaEnvelope /> Correo
          </a>

          <a href="#">
            <FaWhatsapp /> WhatsApp Centro
          </a>

          <a href="#">
            <FaWhatsapp /> WhatsApp Sur
          </a>

          <div className="footer-social">

            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Provinur. Todos los derechos reservados.

      </div>

    </footer>
  );
}

export default Footer;
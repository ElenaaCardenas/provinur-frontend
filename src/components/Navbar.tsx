import { Link } from "react-router-dom";
import logo from "../assets/PROVINUR LOGO 2026.png";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
 const [showWhatsapp, setShowWhatsapp] = useState(false);
  return (
    <nav className="navbar">

      <Link to="/" className="logo">

        <img
          src={logo}
          alt="Provinur"
          className="logo-image"
        />

      </Link>

      <ul className="nav-links">

  <li><Link to="/">Inicio</Link></li>

  <li><Link to="/productos">Productos</Link></li>

  <li><Link to="/nosotros">Nosotros</Link></li>

  <li><Link to="/contacto">Contacto</Link></li>

  <li className="whatsapp-menu">

    <button
      className="whatsapp-navbar-btn"
      onClick={() => setShowWhatsapp(!showWhatsapp)}
    >
      <FaWhatsapp />
    </button>

    {showWhatsapp && (

      <div className="whatsapp-dropdown">

        <a
          href="https://wa.me/521XXXXXXXXXX"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Centro
        </a>

        <a
          href="https://wa.me/9621842040"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Sur
        </a>

      </div>

    )}

  </li>

</ul>

    </nav>
  );
}

export default Navbar;
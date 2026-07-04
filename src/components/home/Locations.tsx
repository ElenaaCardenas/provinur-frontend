import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

function Locations() {
  return (
    <section className="locations">

      <div className="section-title">
        <h2>Nuestras Sucursales</h2>
        <p>
          Contamos con atención especializada para distintas regiones del país.
        </p>
      </div>

      <div className="locations-grid">

        <div className="location-card">

          <h3>📍 Provinur Centro</h3>

          <p>
            Dirección de la sucursal Centro.
          </p>

          <a href="#">
            <FaMapMarkerAlt />
            Ver ubicación
          </a>

          <a href="#">
            <FaWhatsapp />
            WhatsApp Centro
          </a>

        </div>

        <div className="location-card">

          <h3>📍 Provinur Sur</h3>

          <p>
            Dirección de la sucursal Sur.
          </p>

          <a href="#">
            <FaMapMarkerAlt />
            Ver ubicación
          </a>

          <a href="#">
            <FaWhatsapp />
            WhatsApp Sur
          </a>

        </div>

      </div>

    </section>
  );
}

export default Locations;
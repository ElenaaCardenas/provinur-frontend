import { Link } from "react-router-dom";

import type { ProvinurService } from "../../types/service";
import { getServiceImageUrl } from "../../services/services";

interface ServiceCardProps {
  service: ProvinurService;
  index: number;
}

function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
  const sortedImages = [...(service.images ?? [])].sort(
    (a, b) => a.orden - b.orden,
  );

  const mainImage = sortedImages[0];
  const isReversed = index % 2 !== 0;

  return (
    <article
      className={`diesel-service-row ${
        isReversed ? "diesel-service-row--reverse" : ""
      }`}
    >
      <div className="diesel-service-row__image">
        {mainImage ? (
          <img
            src={getServiceImageUrl(mainImage.url)}
            alt={service.nombre}
            loading="lazy"
          />
        ) : (
          <div className="diesel-service-row__placeholder">
            <span>Imagen del servicio</span>
          </div>
        )}
      </div>

      <div className="diesel-service-row__content">
        <span className="diesel-service-row__eyebrow">
          {service.serviceType.nombre}
        </span>

        <h3>{service.nombre}</h3>

        <p>
          {service.descripcion ||
            "Consulta la información de este servicio especializado."}
        </p>

        <Link
          to="/contacto"
          state={{
            productName: service.nombre,
          }}
          className="diesel-service-row__button"
        >
          Solicitar información
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

import ServiceCard from "../components/services/ServiceCard";
import { getServices } from "../services/services";
import type { ProvinurService } from "../types/service";

import "../styles/diesel-lab.css";

const DIESEL_SERVICE_TYPE_ID = 1;

function DieselLab() {
  const [services, setServices] = useState<
    ProvinurService[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const brands = [
    "CAT",
    "Bosch",
    "Stanadyne",
    "Perkins",
    "Cummins",
    "Delphi",
  ];

  const benefits = [
    "Atención especializada en sistemas de inyección diésel",
    "Diagnóstico antes de realizar una reparación",
    "Servicio para bombas de inyección e inyectores",
    "Seguimiento personalizado para cada solicitud",
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data = await getServices({
          serviceTypeId: DIESEL_SERVICE_TYPE_ID,
          onlyActive: true,
        });

        if (isMounted) {
          setServices(data);
        }
      } catch (requestError) {
        console.error(
          "Error al cargar servicios de laboratorio diésel:",
          requestError,
        );

        if (isMounted) {
          setError(
            "No fue posible cargar los servicios de laboratorio diésel en este momento.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="diesel-page">
      <section className="diesel-hero">
        <div className="diesel-hero__overlay" />

        <div className="diesel-hero-content">
          <h1>Laboratorio Diésel</h1>

          <p>
            Diagnóstico, reparación, calibración y
            mantenimiento para sistemas de inyección diésel.
          </p>
        </div>
      </section>

      <section className="diesel-introduction">
        <div className="diesel-introduction__content">
          <div className="diesel-introduction__text">
            <span>
              LABORATORIO ESPECIALIZADO
            </span>

            <h2>
              Profesionales en sistemas de inyección
              diésel
            </h2>

            <p>
              En Provinur brindamos atención especializada
              para bombas de inyección e inyectores
              utilizados en sistemas diésel.
            </p>

            <p>
              Realizamos una revisión inicial para
              identificar fallas, evaluar las condiciones
              del componente y determinar el servicio
              adecuado para cada caso.
            </p>
          </div>

          <div className="diesel-introduction__image">
            <span>
              Próximamente: imagen del laboratorio diésel
            </span>
          </div>
        </div>
      </section>

      <section className="diesel-section">
        <div className="diesel-section-heading">
          <span>
            NUESTROS SERVICIOS
          </span>

          <h2>
            Atención técnica y especializada
          </h2>

          <p>
            Conoce los servicios disponibles para el
            diagnóstico, mantenimiento y reparación de
            bombas e inyectores.
          </p>
        </div>

        {loading && (
          <div className="diesel-services-status">
            <p>
              Cargando servicios de laboratorio diésel...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="diesel-services-status diesel-services-status--error">
            <h3>
              No pudimos cargar los servicios
            </h3>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          services.length === 0 && (
            <div className="diesel-services-status">
              <h3>
                Próximamente nuevos servicios
              </h3>

              <p>
                El equipo de Provinur se encuentra
                preparando la información de sus servicios
                especializados.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          services.length > 0 && (
            <div className="diesel-services-list">
              {services.map(
                (service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                  />
                ),
              )}
            </div>
          )}
      </section>

      <section className="diesel-brands-section">
        <div className="diesel-section-heading">
          <span>
            MARCAS
          </span>

          <h2>
            Experiencia con distintas marcas del sector
          </h2>

          <p>
            Brindamos atención a componentes de diferentes
            marcas utilizadas en sistemas de inyección
            diésel.
          </p>
        </div>

        <div className="diesel-brands-grid">
          {brands.map((brand) => (
            <div
              className="diesel-brand-card"
              key={brand}
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="diesel-benefits-section">
        <div className="diesel-benefits-content">
          <span className="diesel-eyebrow">
            ¿POR QUÉ PROVINUR?
          </span>

          <h2>
            Atención técnica para cada necesidad
          </h2>

          <p>
            Cada componente requiere una revisión adecuada
            antes de definir el servicio correspondiente.
          </p>

          <ul className="diesel-benefits-list">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <FaCheck />

                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="diesel-location-card">
          <span>
            ATENCIÓN
          </span>

          <h3>
            Tapachula, Chiapas
          </h3>

          <p>
            Comunícate con Provinur para consultar
            disponibilidad, alcance y requisitos de los
            servicios de laboratorio diésel.
          </p>

          <div className="diesel-contact-detail">
            <FaLocationDot />

            <span>
              Atención en Tapachula y según cobertura
            </span>
          </div>

          <div className="diesel-contact-detail">
            <FaPhone />

            <a href="tel:9671516736">
              967 151 67 36
            </a>
          </div>
        </div>
      </section>

      <section className="diesel-cta">
        <div>
          <span>
            SOLICITA INFORMACIÓN
          </span>

          <h2>
            ¿Necesitas revisar una bomba o un inyector?
          </h2>

          <p>
            Envíanos los datos del componente y nuestro
            equipo se pondrá en contacto contigo.
          </p>
        </div>

        <Link
          to="/contacto"
          state={{
            productName:
              "Servicio de Laboratorio Diésel",
          }}
          className="diesel-secondary-button"
        >
          Contactar a Provinur
        </Link>
      </section>
    </main>
  );
}

export default DieselLab;
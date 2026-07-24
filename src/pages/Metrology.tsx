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
import "../styles/metrology.css";

const METROLOGY_SERVICE_TYPE_ID = 2;

function Metrology() {
  const [services, setServices] = useState<
    ProvinurService[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const brands = [
    "Fluke",
    "Mitutoyo",
    "Testo",
    "Hioki",
    "Extech",
    "Keysight",
  ];

  const benefits = [
    "Atención para diferentes instrumentos de medición",
    "Servicios orientados al control de calidad",
    "Seguimiento de acuerdo con las necesidades del cliente",
    "Atención personalizada para empresas e industria",
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data = await getServices({
          serviceTypeId:
            METROLOGY_SERVICE_TYPE_ID,
          onlyActive: true,
        });

        if (isMounted) {
          setServices(data);
        }
      } catch (requestError) {
        console.error(
          "Error al cargar servicios de metrología:",
          requestError,
        );

        if (isMounted) {
          setError(
            "No fue posible cargar los servicios de metrología en este momento.",
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
    <main className="diesel-page metrology-page">
      <section className="diesel-hero metrology-hero">
        <div className="diesel-hero__overlay" />

        <div className="diesel-hero-content">
          <h1>Metrología</h1>

          <p>
            Calibración, verificación y servicios
            metrológicos para instrumentos de medición
            utilizados en procesos industriales.
          </p>
        </div>
      </section>

      <section className="metrology-introduction">
        <div className="metrology-introduction__content">
          <div className="metrology-introduction__text">
            <span>
              SERVICIOS METROLÓGICOS
            </span>

            <h2>
              Confiabilidad en los procesos de medición
            </h2>

            <p>
              En Provinur ofrecemos atención especializada
              para instrumentos de medición utilizados en
              diferentes procesos industriales.
            </p>

            <p>
              Nuestro objetivo es apoyar a las empresas en
              el control de sus equipos, brindando
              información clara y soluciones adecuadas para
              cada necesidad.
            </p>
          </div>

          <div className="metrology-introduction__image">
            <span>
              Próximamente: imagen de metrología
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
            Soluciones de metrología para la industria
          </h2>

          <p>
            Consulta los servicios disponibles para
            instrumentos de medición, calibración,
            verificación, capacitación y control
            metrológico.
          </p>
        </div>

        {loading && (
          <div className="diesel-services-status">
            <p>
              Cargando servicios de metrología...
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
                preparando la información de sus
                servicios de metrología.
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

      <section className="diesel-brands-section metrology-brands-section">
        <div className="diesel-section-heading">
          <span>
            MARCAS
          </span>

          <h2>
            Experiencia con instrumentos de distintas marcas
          </h2>

          <p>
            Atención para equipos e instrumentos empleados
            en actividades de medición y control industrial.
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
            Atención especializada para cada instrumento
          </h2>

          <p>
            Cada equipo de medición requiere una revisión
            adecuada antes de definir el servicio
            correspondiente.
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
            Solicita información
          </h3>

          <p>
            Comunícate con Provinur para consultar
            disponibilidad, alcance y requisitos de los
            servicios de metrología.
          </p>

          <div className="metrology-contact-detail">
            <FaLocationDot />

            <span>
              Atención según ubicación y cobertura
            </span>
          </div>

          <div className="metrology-contact-detail">
            <FaPhone />

            <a href="tel:9671516736">
              967 151 67 36
            </a>
          </div>
        </div>
      </section>

      <section className="diesel-cta metrology-cta">
        <div>
          <span>
            SOLICITA INFORMACIÓN
          </span>

          <h2>
            ¿Necesitas atención para un instrumento de
            medición?
          </h2>

          <p>
            Envíanos los datos del equipo y nuestro equipo
            se pondrá en contacto contigo.
          </p>
        </div>

        <Link
          to="/contacto"
          state={{
            productName:
              "Servicio de Metrología",
          }}
          className="diesel-secondary-button"
        >
          Contactar a Provinur
        </Link>
      </section>
    </main>
  );
}

export default Metrology;
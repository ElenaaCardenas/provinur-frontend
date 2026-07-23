import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';

import {
  FaBars,
  FaChevronDown,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa';

import logo from '../assets/PROVINUR LOGO 2026.png';

import '../styles/navbar.css';

type DropdownName =
  | 'productos'
  | 'servicios'
  | 'whatsapp'
  | null;

function Navbar() {
  const location = useLocation();

  const navbarRef = useRef<HTMLElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<DropdownName>(null);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (
    dropdownName: Exclude<DropdownName, null>,
  ) => {
    setOpenDropdown((currentDropdown) =>
      currentDropdown === dropdownName
        ? null
        : dropdownName,
    );
  };

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick,
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `navbar-link ${
      isActive ? 'navbar-link-active' : ''
    }`;

  const productsIsActive =
    location.pathname.startsWith('/productos');

  const servicesIsActive =
    location.pathname.startsWith(
      '/laboratorio-diesel',
    ) ||
    location.pathname.startsWith('/metrologia') ||
    location.pathname.startsWith(
      '/insumos-seguridad',
    );

  return (
    <header
      ref={navbarRef}
      className="navbar"
    >
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          aria-label="Ir al inicio de Provinur"
          onClick={closeMenus}
        >
          <img
            src={logo}
            alt="Provinur"
            className="navbar-logo-image"
          />
        </Link>

        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-label={
            mobileMenuOpen
              ? 'Cerrar menú'
              : 'Abrir menú'
          }
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen(
              (currentState) => !currentState,
            )
          }
        >
          {mobileMenuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

        <nav
          className={`navbar-navigation ${
            mobileMenuOpen
              ? 'navbar-navigation-open'
              : ''
          }`}
          aria-label="Navegación principal"
        >
          <ul className="navbar-links">
            <li className="navbar-item">
              <NavLink
                to="/"
                end
                className={navLinkClass}
              >
                Inicio
              </NavLink>
            </li>

            <li className="navbar-item navbar-dropdown">
              <button
                type="button"
                className={`navbar-link navbar-dropdown-button ${
                  productsIsActive
                    ? 'navbar-link-active'
                    : ''
                }`}
                aria-expanded={
                  openDropdown === 'productos'
                }
                onClick={() =>
                  toggleDropdown('productos')
                }
              >
                Productos

                <FaChevronDown
                  className={`navbar-chevron ${
                    openDropdown === 'productos'
                      ? 'navbar-chevron-open'
                      : ''
                  }`}
                />
              </button>

              <div
                className={`navbar-dropdown-menu navbar-products-menu ${
                  openDropdown === 'productos'
                    ? 'navbar-dropdown-menu-open'
                    : ''
                }`}
              >
                <div className="navbar-dropdown-heading">
                  <span>Catálogo Provinur</span>

                  <p>
                    Consulta nuestras soluciones,
                    equipos e insumos industriales.
                  </p>
                </div>

                <Link
                  to="/productos"
                  className="navbar-dropdown-featured"
                >
                  <span className="navbar-dropdown-icon">
                    P
                  </span>

                  <span>
                    <strong>
                      Todos los productos
                    </strong>

                    <small>
                      Explora el catálogo completo
                    </small>
                  </span>
                </Link>

                <div className="navbar-dropdown-note">
                  Las categorías se mostrarán aquí
                  cuando conectemos el catálogo con el
                  backend.
                </div>
              </div>
            </li>

            <li className="navbar-item navbar-dropdown">
              <button
                type="button"
                className={`navbar-link navbar-dropdown-button ${
                  servicesIsActive
                    ? 'navbar-link-active'
                    : ''
                }`}
                aria-expanded={
                  openDropdown === 'servicios'
                }
                onClick={() =>
                  toggleDropdown('servicios')
                }
              >
                Servicios

                <FaChevronDown
                  className={`navbar-chevron ${
                    openDropdown === 'servicios'
                      ? 'navbar-chevron-open'
                      : ''
                  }`}
                />
              </button>

              <div
                className={`navbar-dropdown-menu navbar-services-menu ${
                  openDropdown === 'servicios'
                    ? 'navbar-dropdown-menu-open'
                    : ''
                }`}
              >
                <div className="navbar-dropdown-heading">
                  <span>
                    Soluciones especializadas
                  </span>

                  <p>
                    Atención técnica y comercial para
                    las necesidades de la industria.
                  </p>
                </div>

                <Link
                  to="/laboratorio-diesel"
                  className="navbar-service-option"
                >
                  <span className="navbar-service-number">
                    01
                  </span>

                  <span>
                    <strong>
                      Laboratorio Diésel
                    </strong>

                    <small>
                      Diagnóstico y servicio
                      especializado
                    </small>
                  </span>
                </Link>

                <Link
                  to="/metrologia"
                  className="navbar-service-option"
                >
                  <span className="navbar-service-number">
                    02
                  </span>

                  <span>
                    <strong>Metrología</strong>

                    <small>
                      Calibración, certificación y
                      capacitación
                    </small>
                  </span>
                </Link>

                <Link
                  to="/insumos-seguridad"
                  className="navbar-service-option"
                >
                  <span className="navbar-service-number">
                    03
                  </span>

                  <span>
                    <strong>
                      Insumos Industriales
                    </strong>

                    <small>
                      Suministros y soluciones para
                      operación industrial
                    </small>
                  </span>
                </Link>
              </div>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/nosotros"
                className={navLinkClass}
              >
                Nosotros
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/contacto"
                className={navLinkClass}
              >
                Contacto
              </NavLink>
            </li>

            <li className="navbar-item navbar-dropdown navbar-whatsapp">
              <button
                type="button"
                className="navbar-whatsapp-button"
                aria-label="Mostrar números de WhatsApp"
                aria-expanded={
                  openDropdown === 'whatsapp'
                }
                onClick={() =>
                  toggleDropdown('whatsapp')
                }
              >
                <FaWhatsapp />

                <span>WhatsApp</span>

                <FaChevronDown
                  className={`navbar-chevron ${
                    openDropdown === 'whatsapp'
                      ? 'navbar-chevron-open'
                      : ''
                  }`}
                />
              </button>

              <div
                className={`navbar-dropdown-menu navbar-whatsapp-menu ${
                  openDropdown === 'whatsapp'
                    ? 'navbar-dropdown-menu-open'
                    : ''
                }`}
              >
                <a
                  href="https://wa.me/521XXXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  className="navbar-whatsapp-option"
                >
                  <FaWhatsapp />

                  <span>
                    <strong>
                      WhatsApp Centro
                    </strong>

                    <small>
                      Atención zona centro
                    </small>
                  </span>
                </a>

                <a
                  href="https://wa.me/529621842040"
                  target="_blank"
                  rel="noreferrer"
                  className="navbar-whatsapp-option"
                >
                  <FaWhatsapp />

                  <span>
                    <strong>WhatsApp Sur</strong>

                    <small>
                      Atención zona sur
                    </small>
                  </span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {mobileMenuOpen && (
        <button
          type="button"
          className="navbar-mobile-overlay"
          aria-label="Cerrar menú"
          onClick={closeMenus}
        />
      )}
    </header>
  );
}

export default Navbar;
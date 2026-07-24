import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaEnvelope,
  FaRightFromBracket,
  FaScrewdriverWrench,
} from "react-icons/fa6";

import {
  getStoredUser,
  logout,
} from "../../services/auth";

import "../../styles/admin.css";

function AdminLayout() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    logout();

    navigate("/admin/login", {
      replace: true,
    });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>PROVINUR</span>
          <small>Administración</small>
        </div>

        <nav className="admin-navigation">
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link admin-nav-link--active"
                : "admin-nav-link"
            }
          >
            <FaBoxOpen />
            Productos
          </NavLink>

          <NavLink
            to="/admin/servicios"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link admin-nav-link--active"
                : "admin-nav-link"
            }
          >
            <FaScrewdriverWrench />
            Servicios
          </NavLink>

          <NavLink
            to="/admin/cotizaciones"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link admin-nav-link--active"
                : "admin-nav-link"
            }
          >
            <FaEnvelope />
            Cotizaciones
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-user">
            <strong>
              {user?.nombre || "Administrador"}
            </strong>

            <span>
              {user?.usuario || ""}
            </span>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <FaRightFromBracket />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
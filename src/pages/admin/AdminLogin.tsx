import { useState } from "react";
import type { FormEvent } from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AxiosError } from "axios";

import {
  isAuthenticated,
  login,
} from "../../services/auth";

import "../../styles/admin.css";

interface LocationState {
  from?: string;
}

interface ApiErrorResponse {
  message?: string;
}

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

  if (isAuthenticated()) {
    return (
      <Navigate
        to="/admin/servicios"
        replace
      />
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await login({
        usuario: usuario.trim(),
        password,
      });

      const state =
        location.state as LocationState | null;

      navigate(
        state?.from || "/admin/servicios",
        {
          replace: true,
        },
      );
    } catch (requestError) {
      const axiosError =
        requestError as AxiosError<ApiErrorResponse>;

      setError(
        axiosError.response?.data?.message ||
          "No fue posible iniciar sesión.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <span>PROVINUR</span>
          <h1>Panel administrativo</h1>
          <p>
            Ingresa con tu usuario para administrar
            productos, servicios y cotizaciones.
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <div className="admin-form-group">
            <label htmlFor="usuario">
              Usuario
            </label>

            <input
              id="usuario"
              name="usuario"
              type="text"
              value={usuario}
              onChange={(event) =>
                setUsuario(event.target.value)
              }
              autoComplete="username"
              required
              disabled={submitting}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
              disabled={submitting}
            />
          </div>

          {error && (
            <div className="admin-form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-primary-button"
            disabled={submitting}
          >
            {submitting
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;
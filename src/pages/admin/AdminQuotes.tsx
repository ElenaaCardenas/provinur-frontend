import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCheck,
  FaEye,
  FaMagnifyingGlass,
  FaRotateLeft,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";

import {
  deleteQuote,
  getQuotes,
  updateQuote,
  type AdminQuote,
} from "../../services/adminQuotes";

function AdminQuotes() {
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);
  const [selectedQuote, setSelectedQuote] =
    useState<AdminQuote | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("todas");

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    void loadQuotes();
  }, []);

  async function loadQuotes() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await getQuotes();

      setQuotes(data);
    } catch (error) {
      console.error(
        "Error al cargar las cotizaciones:",
        error,
      );

      setErrorMessage(
        "No fue posible cargar las cotizaciones.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const filteredQuotes = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return quotes.filter((quote) => {
      const matchesSearch =
        !normalizedSearch ||
        quote.nombre
          .toLowerCase()
          .includes(normalizedSearch) ||
        quote.empresa
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        quote.correo
          .toLowerCase()
          .includes(normalizedSearch) ||
        quote.telefono
          .toLowerCase()
          .includes(normalizedSearch) ||
        quote.mensaje
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "todas" ||
        (statusFilter === "atendidas" &&
          quote.atendido) ||
        (statusFilter === "pendientes" &&
          !quote.atendido);

      return matchesSearch && matchesStatus;
    });
  }, [quotes, searchTerm, statusFilter]);

  function openQuote(quote: AdminQuote) {
    setSelectedQuote(quote);
  }

  function closeQuote() {
    if (isUpdating) {
      return;
    }

    setSelectedQuote(null);
  }

  async function handleStatusChange(
    quote: AdminQuote,
  ) {
    setIsUpdating(true);
    setErrorMessage("");

    try {
      const updatedQuote = await updateQuote(
        quote.id,
        !quote.atendido,
      );

      setQuotes((currentQuotes) =>
        currentQuotes.map((currentQuote) =>
          currentQuote.id === updatedQuote.id
            ? updatedQuote
            : currentQuote,
        ),
      );

      setSelectedQuote((currentQuote) =>
        currentQuote?.id === updatedQuote.id
          ? updatedQuote
          : currentQuote,
      );
    } catch (error) {
      console.error(
        "Error al actualizar la cotización:",
        error,
      );

      setErrorMessage(
        "No fue posible actualizar el estado de la cotización.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete(
    quote: AdminQuote,
  ) {
    const shouldDelete = window.confirm(
      `¿Deseas eliminar la solicitud de ${quote.nombre}?`,
    );

    if (!shouldDelete) {
      return;
    }

    setIsUpdating(true);
    setErrorMessage("");

    try {
      await deleteQuote(quote.id);

      setQuotes((currentQuotes) =>
        currentQuotes.filter(
          (currentQuote) =>
            currentQuote.id !== quote.id,
        ),
      );

      if (selectedQuote?.id === quote.id) {
        setSelectedQuote(null);
      }
    } catch (error) {
      console.error(
        "Error al eliminar la cotización:",
        error,
      );

      setErrorMessage(
        "No fue posible eliminar la cotización.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  return (
    <section className="admin-page">
      <header className="admin-page-header">
        <div>
          <span>Administración</span>

          <h1>Cotizaciones</h1>

          <p>
            Consulta y administra las solicitudes
            enviadas por los clientes.
          </p>
        </div>

        <span className="admin-result-count">
          {filteredQuotes.length}{" "}
          {filteredQuotes.length === 1
            ? "solicitud"
            : "solicitudes"}
        </span>
      </header>

      <div className="admin-toolbar">
        <div className="admin-search">
          <FaMagnifyingGlass />

          <input
            type="search"
            placeholder="Buscar por cliente, empresa, correo o teléfono"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="todas">
            Todas las solicitudes
          </option>

          <option value="pendientes">
            Pendientes
          </option>

          <option value="atendidas">
            Atendidas
          </option>
        </select>
      </div>

      {errorMessage && (
        <p className="admin-form-error">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <div className="admin-empty-state">
          Cargando cotizaciones...
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="admin-empty-state">
          {quotes.length === 0
            ? "Todavía no hay solicitudes de cotización."
            : "No se encontraron solicitudes con esos filtros."}
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td>
                    <div className="admin-service-name">
                      <strong>{quote.nombre}</strong>

                      <span>
                        {quote.empresa ||
                          "Sin empresa"}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="admin-service-name">
                      <strong>{quote.correo}</strong>

                      <span>{quote.telefono}</span>
                    </div>
                  </td>

                  <td>
                    {formatDate(quote.createdAt)}
                  </td>

                  <td>
                    <span
                      className={`admin-status ${
                        quote.atendido
                          ? "admin-status--active"
                          : "admin-status--inactive"
                      }`}
                    >
                      {quote.atendido
                        ? "Atendida"
                        : "Pendiente"}
                    </span>
                  </td>

                  <td>
                    <div className="admin-row-actions">
                      <button
                        type="button"
                        className="admin-icon-button"
                        title="Ver solicitud"
                        aria-label={`Ver solicitud de ${quote.nombre}`}
                        onClick={() =>
                          openQuote(quote)
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        className="admin-icon-button"
                        title={
                          quote.atendido
                            ? "Marcar como pendiente"
                            : "Marcar como atendida"
                        }
                        aria-label={
                          quote.atendido
                            ? "Marcar como pendiente"
                            : "Marcar como atendida"
                        }
                        disabled={isUpdating}
                        onClick={() =>
                          void handleStatusChange(
                            quote,
                          )
                        }
                      >
                        {quote.atendido ? (
                          <FaRotateLeft />
                        ) : (
                          <FaCheck />
                        )}
                      </button>

                      <button
                        type="button"
                        className="admin-icon-button admin-icon-button--danger"
                        title="Eliminar solicitud"
                        aria-label={`Eliminar solicitud de ${quote.nombre}`}
                        disabled={isUpdating}
                        onClick={() =>
                          void handleDelete(quote)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedQuote && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeQuote();
            }
          }}
        >
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <header className="admin-modal-header">
              <div>
                <span>Solicitud de cotización</span>

                <h2 id="quote-modal-title">
                  {selectedQuote.nombre}
                </h2>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                aria-label="Cerrar"
                disabled={isUpdating}
                onClick={closeQuote}
              >
                <FaXmark />
              </button>
            </header>

            <div className="admin-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Cliente</label>
                  <p>{selectedQuote.nombre}</p>
                </div>

                <div className="admin-form-group">
                  <label>Empresa</label>
                  <p>
                    {selectedQuote.empresa ||
                      "No especificada"}
                  </p>
                </div>

                <div className="admin-form-group">
                  <label>Correo electrónico</label>
                  <p>
                    <a
                      href={`mailto:${selectedQuote.correo}`}
                    >
                      {selectedQuote.correo}
                    </a>
                  </p>
                </div>

                <div className="admin-form-group">
                  <label>Teléfono</label>
                  <p>
                    <a
                      href={`tel:${selectedQuote.telefono}`}
                    >
                      {selectedQuote.telefono}
                    </a>
                  </p>
                </div>

                <div className="admin-form-group">
                  <label>Fecha de solicitud</label>
                  <p>
                    {formatDate(
                      selectedQuote.createdAt,
                    )}
                  </p>
                </div>

                <div className="admin-form-group">
                  <label>Estado</label>

                  <p>
                    <span
                      className={`admin-status ${
                        selectedQuote.atendido
                          ? "admin-status--active"
                          : "admin-status--inactive"
                      }`}
                    >
                      {selectedQuote.atendido
                        ? "Atendida"
                        : "Pendiente"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Mensaje</label>

                <div className="admin-quote-message">
                  {selectedQuote.mensaje}
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="danger-button"
                  disabled={isUpdating}
                  onClick={() =>
                    void handleDelete(
                      selectedQuote,
                    )
                  }
                >
                  <FaTrash />
                  Eliminar
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  disabled={isUpdating}
                  onClick={closeQuote}
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  className="primary-button"
                  disabled={isUpdating}
                  onClick={() =>
                    void handleStatusChange(
                      selectedQuote,
                    )
                  }
                >
                  {selectedQuote.atendido ? (
                    <>
                      <FaRotateLeft />
                      Marcar pendiente
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Marcar atendida
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminQuotes;
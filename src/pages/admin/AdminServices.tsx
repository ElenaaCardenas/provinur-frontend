import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";
import type { AxiosError } from "axios";

import {
  FaMagnifyingGlass,
  FaPen,
  FaPlus,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";

import {
  createService,
  deleteService,
  getAdminServices,
  getServiceTypes,
  updateService,
  uploadServiceImages,
} from "../../services/adminServices";

import type {
  ProvinurService,
  ServiceType,
} from "../../types/service";

interface ApiErrorResponse {
  message?: string | string[];
}

interface ServiceForm {
  nombre: string;
  descripcion: string;
  activo: boolean;
  serviceTypeId: string;
}

const INITIAL_FORM: ServiceForm = {
  nombre: "",
  descripcion: "",
  activo: true,
  serviceTypeId: "",
};

function AdminServices() {
  const [services, setServices] = useState<
    ProvinurService[]
  >([]);

  const [serviceTypes, setServiceTypes] = useState<
    ServiceType[]
  >([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingService, setEditingService] =
    useState<ProvinurService | null>(null);

  const [form, setForm] =
    useState<ServiceForm>(INITIAL_FORM);

  const [selectedImages, setSelectedImages] =
    useState<File[]>([]);

  useEffect(() => {
    void loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setError("");

      const [
        servicesData,
        serviceTypesData,
      ] = await Promise.all([
        getAdminServices(),
        getServiceTypes(),
      ]);

      setServices(servicesData);
      setServiceTypes(serviceTypesData);
    } catch (requestError) {
      console.error(requestError);

      setError(
        "No fue posible cargar los servicios.",
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredServices = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !normalizedSearch ||
        service.nombre
          .toLowerCase()
          .includes(normalizedSearch) ||
        service.descripcion
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesType =
        !typeFilter ||
        String(service.serviceType.id) ===
          typeFilter;

      return matchesSearch && matchesType;
    });
  }, [services, search, typeFilter]);

  function openCreateForm() {
    setEditingService(null);
    setForm(INITIAL_FORM);
    setSelectedImages([]);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEditForm(
    service: ProvinurService,
  ) {
    setEditingService(service);

    setForm({
      nombre: service.nombre,
      descripcion:
        service.descripcion ?? "",
      activo: service.activo,
      serviceTypeId: String(
        service.serviceType.id,
      ),
    });

    setSelectedImages([]);
    setFormError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (saving) {
      return;
    }

    setIsFormOpen(false);
    setEditingService(null);
    setForm(INITIAL_FORM);
    setSelectedImages([]);
    setFormError("");
  }

  function handleImageChange(
  event: ChangeEvent<HTMLInputElement>,
) {
    const files = Array.from(
      event.target.files ?? [],
    );

    if (files.length > 3) {
      setFormError(
        "Solo puedes seleccionar hasta 3 imágenes.",
      );

      event.target.value = "";
      return;
    }

    const invalidFile = files.find(
      (file) =>
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
        ].includes(file.type),
    );

    if (invalidFile) {
      setFormError(
        "Las imágenes deben ser JPG, PNG o WEBP.",
      );

      event.target.value = "";
      return;
    }

    const oversizedFile = files.find(
      (file) =>
        file.size > 5 * 1024 * 1024,
    );

    if (oversizedFile) {
      setFormError(
        "Cada imagen debe pesar máximo 5 MB.",
      );

      event.target.value = "";
      return;
    }

    setFormError("");
    setSelectedImages(files);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form.nombre.trim()) {
      setFormError(
        "El nombre del servicio es obligatorio.",
      );
      return;
    }

    if (!form.serviceTypeId) {
      setFormError(
        "Selecciona la sección del servicio.",
      );
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      const payload = {
        nombre: form.nombre.trim(),
        descripcion:
          form.descripcion.trim(),
        activo: form.activo,
        serviceTypeId: Number(
          form.serviceTypeId,
        ),
      };

      let savedService: ProvinurService;

      if (editingService) {
        savedService = await updateService(
          editingService.id,
          payload,
        );
      } else {
        savedService =
          await createService(payload);
      }

      if (selectedImages.length > 0) {
        savedService =
          await uploadServiceImages(
            savedService.id,
            selectedImages,
          );
      }

      setServices((currentServices) => {
        const alreadyExists =
          currentServices.some(
            (service) =>
              service.id === savedService.id,
          );

        if (alreadyExists) {
          return currentServices.map(
            (service) =>
              service.id ===
              savedService.id
                ? savedService
                : service,
          );
        }

        return [
          savedService,
          ...currentServices,
        ];
      });

      closeForm();
    } catch (requestError) {
      console.error(requestError);

      const axiosError =
        requestError as AxiosError<ApiErrorResponse>;

      const apiMessage =
        axiosError.response?.data?.message;

      if (Array.isArray(apiMessage)) {
        setFormError(
          apiMessage.join(" "),
        );
      } else {
        setFormError(
          apiMessage ||
            "No fue posible guardar el servicio.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    service: ProvinurService,
  ) {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${service.nombre}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteService(service.id);

      setServices((currentServices) =>
        currentServices.filter(
          (currentService) =>
            currentService.id !== service.id,
        ),
      );
    } catch (requestError) {
      console.error(requestError);

      window.alert(
        "No fue posible eliminar el servicio.",
      );
    }
  }

  return (
    <section className="admin-page">
      <header className="admin-page-header">
        <div>
          <span>Administración</span>
          <h1>Servicios</h1>
        </div>

        <button
          type="button"
          className="admin-primary-action"
          onClick={openCreateForm}
        >
          <FaPlus />
          Nuevo servicio
        </button>
      </header>

      <div className="admin-toolbar">
        <div className="admin-search">
          <FaMagnifyingGlass />

          <input
            type="search"
            placeholder="Buscar por nombre o descripción"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <select
          className="admin-filter-select"
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(event.target.value)
          }
        >
          <option value="">
            Todas las secciones
          </option>

          {serviceTypes.map(
            (serviceType) => (
              <option
                key={serviceType.id}
                value={serviceType.id}
              >
                {serviceType.nombre}
              </option>
            ),
          )}
        </select>
      </div>

      {loading && (
        <div className="admin-empty-state">
          Cargando servicios...
        </div>
      )}

      {!loading && error && (
        <div className="admin-empty-state">
          <div>
            <p>{error}</p>

            <button
              type="button"
              className="admin-secondary-action"
              onClick={() =>
                void loadInitialData()
              }
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      )}

      {!loading &&
        !error &&
        filteredServices.length === 0 && (
          <div className="admin-empty-state">
            No se encontraron servicios.
          </div>
        )}

      {!loading &&
        !error &&
        filteredServices.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Sección</th>
                  <th>Imágenes</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredServices.map(
                  (service) => (
                    <tr key={service.id}>
                      <td>
                        <div className="admin-service-name">
                          <strong>
                            {service.nombre}
                          </strong>

                          <span>
                            {service.descripcion ||
                              "Sin descripción"}
                          </span>
                        </div>
                      </td>

                      <td>
                        {
                          service.serviceType
                            .nombre
                        }
                      </td>

                      <td>
                        {service.images?.length ??
                          0}{" "}
                        / 3
                      </td>

                      <td>
                        <span
                          className={
                            service.activo
                              ? "admin-status admin-status--active"
                              : "admin-status admin-status--inactive"
                          }
                        >
                          {service.activo
                            ? "Activo"
                            : "Inactivo"}
                        </span>
                      </td>

                      <td>
                        <div className="admin-row-actions">
                          <button
                            type="button"
                            className="admin-icon-button"
                            title="Editar servicio"
                            onClick={() =>
                              openEditForm(
                                service,
                              )
                            }
                          >
                            <FaPen />
                          </button>

                          <button
                            type="button"
                            className="admin-icon-button admin-icon-button--danger"
                            title="Eliminar servicio"
                            onClick={() =>
                              void handleDelete(
                                service,
                              )
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}

      {isFormOpen && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onMouseDown={closeForm}
        >
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-form-title"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <header className="admin-modal-header">
              <div>
                <span>
                  {editingService
                    ? "Editar"
                    : "Crear"}
                </span>

                <h2 id="service-form-title">
                  {editingService
                    ? "Editar servicio"
                    : "Nuevo servicio"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeForm}
                disabled={saving}
                aria-label="Cerrar formulario"
              >
                <FaXmark />
              </button>
            </header>

            <form
              className="admin-service-form"
              onSubmit={handleSubmit}
            >
              <div className="admin-form-group">
                <label htmlFor="service-name">
                  Nombre del servicio
                </label>

                <input
                  id="service-name"
                  type="text"
                  value={form.nombre}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      nombre:
                        event.target.value,
                    }))
                  }
                  maxLength={150}
                  required
                  disabled={saving}
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="service-type">
                  Sección
                </label>

                <select
                  id="service-type"
                  value={form.serviceTypeId}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      serviceTypeId:
                        event.target.value,
                    }))
                  }
                  required
                  disabled={saving}
                >
                  <option value="">
                    Selecciona una sección
                  </option>

                  {serviceTypes.map(
                    (serviceType) => (
                      <option
                        key={serviceType.id}
                        value={serviceType.id}
                      >
                        {serviceType.nombre}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="service-description">
                  Descripción
                </label>

                <textarea
                  id="service-description"
                  value={form.descripcion}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      descripcion:
                        event.target.value,
                    }))
                  }
                  rows={6}
                  disabled={saving}
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="service-images">
                  Imágenes
                </label>

                <input
                  id="service-images"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={handleImageChange}
                  disabled={saving}
                />

                <small>
                  Puedes seleccionar hasta 3
                  imágenes. JPG, PNG o WEBP,
                  máximo 5 MB por imagen.
                </small>

                {selectedImages.length >
                  0 && (
                  <div className="admin-selected-files">
                    {selectedImages.map(
                      (image) => (
                        <span
                          key={`${image.name}-${image.lastModified}`}
                        >
                          {image.name}
                        </span>
                      ),
                    )}
                  </div>
                )}

                {editingService &&
                  editingService.images
                    ?.length > 0 && (
                    <small>
                      Actualmente tiene{" "}
                      {
                        editingService.images
                          .length
                      }{" "}
                      imagen(es). Las nuevas
                      imágenes se agregarán al
                      servicio.
                    </small>
                  )}
              </div>

              <label className="admin-checkbox-field">
                <input
                  type="checkbox"
                  checked={form.activo}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      activo:
                        event.target.checked,
                    }))
                  }
                  disabled={saving}
                />

                <span>
                  Mostrar este servicio en el
                  sitio público
                </span>
              </label>

              {formError && (
                <div className="admin-form-error">
                  {formError}
                </div>
              )}

              <footer className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-secondary-action"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="admin-primary-action"
                  disabled={saving}
                >
                  {saving
                    ? "Guardando..."
                    : editingService
                      ? "Guardar cambios"
                      : "Crear servicio"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}

export default AdminServices;
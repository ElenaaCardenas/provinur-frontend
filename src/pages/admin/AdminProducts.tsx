import {
  FaMagnifyingGlass,
  FaPen,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";

import {
  useCallback,
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
  createBrand,
  createCategory,
  createProduct,
  deleteProduct,
  getAdminProducts,
  getBrands,
  getCategories,
  updateProduct,
  deleteProductImage,
  getProductFileUrl,
  uploadProductImages,
  deleteTechnicalSheet,
  uploadTechnicalSheet,
} from "../../services/adminProducts";

import type {
  AdminBrand,
  AdminCategory,
  AdminProduct,
  ProductPayload,
} from "../../services/adminProducts";

interface ProductForm {
  nombre: string;
  descripcion: string;
  disponible: boolean;
  brandId: string;
  categoryId: string;
}

const emptyForm: ProductForm = {
  nombre: "",
  descripcion: "",
  disponible: true,
  brandId: "",
  categoryId: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<
    AdminProduct[]
  >([]);

  const [brands, setBrands] = useState<
    AdminBrand[]
  >([]);

  const [categories, setCategories] = useState<
    AdminCategory[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<AdminProduct | null>(null);

  const [form, setForm] =
    useState<ProductForm>(emptyForm);

  const [formError, setFormError] =
    useState("");
  
  const [newBrandName, setNewBrandName] =
    useState("");

  const [newCategoryName, setNewCategoryName] =
    useState("");
  
    const [newImages, setNewImages] =
  useState<File[]>([]);

    const [imagePreviews, setImagePreviews] =
    useState<string[]>([]);

    const [deletingImageId, setDeletingImageId] =
    useState<number | null>(null);

    const [
  technicalSheetFile,
  setTechnicalSheetFile,
] = useState<File | null>(null);

const [
  deletingTechnicalSheet,
  setDeletingTechnicalSheet,
] = useState(false);

    async function loadProducts() {
    try {
      setLoading(true);

      const data = await getAdminProducts();

      setProducts(data);
    } catch (error) {
      const err =
        error as AxiosError<{
          message: string;
        }>;

      alert(
        err.response?.data?.message ??
          "No fue posible obtener los productos.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadCatalogs() {
    try {
      const [
        brandsData,
        categoriesData,
      ] = await Promise.all([
        getBrands(),
        getCategories(),
      ]);

      setBrands(brandsData);
      setCategories(categoriesData);
    } catch (error) {
      const err =
        error as AxiosError<{
          message: string;
        }>;

      alert(
        err.response?.data?.message ??
          "No fue posible obtener las marcas y categorías.",
      );
    }
  }

  useEffect(() => {
    void loadProducts();
    void loadCatalogs();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const productName =
        product.nombre.toLowerCase();

      const brandName =
        product.brand?.nombre
          ?.toLowerCase() ?? "";

      const categoryName =
        product.category?.nombre
          ?.toLowerCase() ?? "";

      return (
        productName.includes(normalizedSearch) ||
        brandName.includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch)
      );
    });
  }, [products, search]);

  const clearImageSelection = useCallback(() => {
  imagePreviews.forEach((preview) => {
    URL.revokeObjectURL(preview);
  });

  setNewImages([]);
  setImagePreviews([]);
}, [imagePreviews]);

useEffect(() => {
  return () => {
    imagePreviews.forEach((preview) => {
      URL.revokeObjectURL(preview);
    });
  };
}, [imagePreviews]);

  function openCreateModal() {
  clearImageSelection();
  setSelectedProduct(null);
  setForm(emptyForm);
  setNewBrandName("");
  setNewCategoryName("");
  setFormError("");
  setModalOpen(true);
  setTechnicalSheetFile(null);
}

  function openEditModal(
  product: AdminProduct,
) {
  setTechnicalSheetFile(null);
  clearImageSelection();
  setSelectedProduct(product);

  setForm({
    nombre: product.nombre,
    descripcion:
      product.descripcion ?? "",
    disponible: product.disponible,
    brandId:
      product.brand?.id?.toString() ?? "",
    categoryId:
      product.category?.id?.toString() ?? "",
  });

  setNewBrandName("");
  setNewCategoryName("");
  setFormError("");
  setModalOpen(true);
}

  function closeModal() {
  if (saving) {
    return;
  }
  setTechnicalSheetFile(null);
  clearImageSelection();
  setModalOpen(false);
  setSelectedProduct(null);
  setForm(emptyForm);
  setNewBrandName("");
  setNewCategoryName("");
  setFormError("");
}

  function handleInputChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >,
  ) {
    const {
      name,
      value,
      type,
    } = event.target;

    if (type === "checkbox") {
      const checkbox =
        event.target as HTMLInputElement;

      setForm((previousForm) => ({
        ...previousForm,
        [name]: checkbox.checked,
      }));

      return;
    }

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function validateForm() {
  if (!form.nombre.trim()) {
    return "Escribe el nombre del producto.";
  }

  if (form.nombre.trim().length > 200) {
    return "El nombre no puede tener más de 200 caracteres.";
  }

  if (
    !form.brandId &&
    !newBrandName.trim()
  ) {
    return "Selecciona una marca o escribe una nueva.";
  }

  if (
    newBrandName.trim().length > 100
  ) {
    return "La nueva marca no puede tener más de 100 caracteres.";
  }

  if (
    !form.categoryId &&
    !newCategoryName.trim()
  ) {
    return "Selecciona una categoría o escribe una nueva.";
  }

  if (
    newCategoryName.trim().length > 100
  ) {
    return "La nueva categoría no puede tener más de 100 caracteres.";
  }

  return "";
}

function handleImagesChange(
  event: ChangeEvent<HTMLInputElement>,
) {
  const selectedFiles = Array.from(
    event.target.files ?? [],
  );

  event.target.value = "";

  if (selectedFiles.length === 0) {
    return;
  }

  const existingImagesCount =
    selectedProduct?.imagenes?.length ?? 0;

  const availableSpaces =
    3 - existingImagesCount - newImages.length;

  if (availableSpaces <= 0) {
    setFormError(
      "El producto ya tiene el máximo de 3 imágenes.",
    );
    return;
  }

  if (selectedFiles.length > availableSpaces) {
    setFormError(
      `Solo puedes agregar ${availableSpaces} ${
        availableSpaces === 1
          ? "imagen"
          : "imágenes"
      } más.`,
    );
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const invalidType = selectedFiles.some(
    (file) =>
      !allowedTypes.includes(file.type),
  );

  if (invalidType) {
    setFormError(
      "Solo se permiten imágenes JPG, PNG o WEBP.",
    );
    return;
  }

  const oversizedFile = selectedFiles.some(
    (file) => file.size > 5 * 1024 * 1024,
  );

  if (oversizedFile) {
    setFormError(
      "Cada imagen debe pesar máximo 5 MB.",
    );
    return;
  }

  const newPreviewUrls =
    selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );

  setNewImages((previous) => [
    ...previous,
    ...selectedFiles,
  ]);

  setImagePreviews((previous) => [
    ...previous,
    ...newPreviewUrls,
  ]);

  setFormError("");
}

function removeSelectedImage(
  index: number,
) {
  const previewToRemove =
    imagePreviews[index];

  if (previewToRemove) {
    URL.revokeObjectURL(
      previewToRemove,
    );
  }

  setNewImages((previous) =>
    previous.filter(
      (_, fileIndex) =>
        fileIndex !== index,
    ),
  );

  setImagePreviews((previous) =>
    previous.filter(
      (_, previewIndex) =>
        previewIndex !== index,
    ),
  );
}

async function handleDeleteExistingImage(
  imageId: number,
) {
  if (!selectedProduct) {
    return;
  }

  const confirmed = window.confirm(
    "¿Deseas eliminar esta imagen?",
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingImageId(imageId);
    setFormError("");

    await deleteProductImage(imageId);

    const updatedProducts =
      await getAdminProducts();

    setProducts(updatedProducts);

    const updatedSelectedProduct =
      updatedProducts.find(
        (product) =>
          product.id ===
          selectedProduct.id,
      );

    if (updatedSelectedProduct) {
      setSelectedProduct(
        updatedSelectedProduct,
      );
    }
  } catch (error) {
    const err =
      error as AxiosError<{
        message: string;
      }>;

    setFormError(
      err.response?.data?.message ??
        "No fue posible eliminar la imagen.",
    );
  } finally {
    setDeletingImageId(null);
  }
}

function handleTechnicalSheetChange(
  event: ChangeEvent<HTMLInputElement>,
) {
  const file =
    event.target.files?.[0] ?? null;

  event.target.value = "";

  if (!file) {
    return;
  }

  if (file.type !== "application/pdf") {
    setFormError(
      "La ficha técnica debe ser un archivo PDF.",
    );

    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setFormError(
      "La ficha técnica debe pesar máximo 10 MB.",
    );

    return;
  }

  setTechnicalSheetFile(file);
  setFormError("");
}

function removeSelectedTechnicalSheet() {
  setTechnicalSheetFile(null);
}

async function handleDeleteTechnicalSheet() {
  if (
    !selectedProduct ||
    !selectedProduct.fichaTecnica
  ) {
    return;
  }

  const confirmed = window.confirm(
    "¿Deseas eliminar la ficha técnica de este producto?",
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingTechnicalSheet(true);
    setFormError("");

    await deleteTechnicalSheet(
      selectedProduct.id,
    );

    const updatedProducts =
      await getAdminProducts();

    setProducts(updatedProducts);

    const updatedSelectedProduct =
      updatedProducts.find(
        (product) =>
          product.id ===
          selectedProduct.id,
      );

    if (updatedSelectedProduct) {
      setSelectedProduct(
        updatedSelectedProduct,
      );
    }

    alert(
      "Ficha técnica eliminada correctamente.",
    );
  } catch (error) {
    const err =
      error as AxiosError<{
        message: string;
      }>;

    setFormError(
      err.response?.data?.message ??
        "No fue posible eliminar la ficha técnica.",
    );
  } finally {
    setDeletingTechnicalSheet(false);
  }
}

async function handleSubmit(
  event: FormEvent<HTMLFormElement>,
) {
  event.preventDefault();

  const validationMessage =
    validateForm();

  if (validationMessage) {
    setFormError(validationMessage);
    return;
  }

  try {
    setSaving(true);
    setFormError("");

    let resolvedBrandId =
      Number(form.brandId);

    let resolvedCategoryId =
      Number(form.categoryId);

    const normalizedNewBrand =
      newBrandName.trim();

    const normalizedNewCategory =
      newCategoryName.trim();

    if (normalizedNewBrand) {
      const existingBrand =
        brands.find(
          (brand) =>
            brand.nombre
              .trim()
              .toLowerCase() ===
            normalizedNewBrand.toLowerCase(),
        );

      if (existingBrand) {
        resolvedBrandId =
          existingBrand.id;
      } else {
        const createdBrand =
          await createBrand({
            nombre: normalizedNewBrand,
          });

        resolvedBrandId =
          createdBrand.id;
      }
    }

    if (normalizedNewCategory) {
      const existingCategory =
        categories.find(
          (category) =>
            category.nombre
              .trim()
              .toLowerCase() ===
            normalizedNewCategory.toLowerCase(),
        );

      if (existingCategory) {
        resolvedCategoryId =
          existingCategory.id;
      } else {
        const createdCategory =
          await createCategory({
            nombre:
              normalizedNewCategory,
          });

        resolvedCategoryId =
          createdCategory.id;
      }
    }

    const payload: ProductPayload = {
      nombre: form.nombre.trim(),
      descripcion:
        form.descripcion.trim() ||
        undefined,
      disponible: form.disponible,
      brandId: resolvedBrandId,
      categoryId:
        resolvedCategoryId,
    };

    const wasEditing =
      selectedProduct !== null;

    let savedProduct: AdminProduct;

if (selectedProduct) {
  savedProduct = await updateProduct(
    selectedProduct.id,
    payload,
  );
} else {
  savedProduct =
    await createProduct(payload);
}

if (newImages.length > 0) {
  await uploadProductImages(
    savedProduct.id,
    newImages,
  );
}

if (technicalSheetFile) {
  await uploadTechnicalSheet(
    savedProduct.id,
    technicalSheetFile,
  );
}
    await Promise.all([
      loadProducts(),
      loadCatalogs(),
    ]);
    setTechnicalSheetFile(null);
    setModalOpen(false);
    setSelectedProduct(null);
    setForm(emptyForm);
    setNewBrandName("");
    setNewCategoryName("");
    clearImageSelection();
    setFormError("");

    alert(
      wasEditing
        ? "Producto actualizado correctamente."
        : "Producto creado correctamente.",
    );
  } catch (error) {
    const err =
      error as AxiosError<{
        message: string | string[];
      }>;

    const backendMessage =
      err.response?.data?.message;

    if (Array.isArray(backendMessage)) {
      setFormError(
        backendMessage.join(", "),
      );
    } else {
      setFormError(
        backendMessage ??
          "No fue posible guardar el producto.",
      );
    }
  } finally {
    setSaving(false);
  }
}

  async function handleDelete(
    id: number,
  ) {
    const confirmDelete =
      window.confirm(
        "¿Deseas eliminar este producto? También se eliminarán sus imágenes y características relacionadas.",
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      await loadProducts();

      alert(
        "Producto eliminado correctamente.",
      );
    } catch (error) {
      const err =
        error as AxiosError<{
          message: string;
        }>;

      alert(
        err.response?.data?.message ??
          "No fue posible eliminar el producto.",
      );
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
            <span>Administración</span>
            <h1>Productos</h1>
        </div>

    <button
        type="button"
        className="admin-primary-action"
        onClick={openCreateModal}
    >
        <FaPlus />
        Nuevo producto
    </button>
    </div>

    <div className="admin-toolbar admin-products-toolbar">
  <div className="admin-search">
    <FaMagnifyingGlass />

    <input
      type="search"
      placeholder="Buscar por nombre, marca o categoría"
      value={search}
      onChange={(event) =>
        setSearch(event.target.value)
      }
    />
  </div>

  <div className="admin-product-count">
    {filteredProducts.length}{" "}
    {filteredProducts.length === 1
      ? "producto"
      : "productos"}
  </div>
</div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Disponible</th>
                <th>Ficha técnica</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length ===
              0 ? (
                <tr>
                  <td colSpan={7}>
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(
                  (product) => (
                    <tr key={product.id}>
                      <td>
                        {product.imagenes &&
                        product.imagenes.length >
                          0 ? (
                          <img
                            src={getProductFileUrl(
                            product.imagenes[0].url,
                            )}
                            alt={
                              product.nombre
                            }
                            className="admin-product-thumbnail"
                          />
                        ) : (
                          <div className="admin-image-placeholder">
                            Sin imagen
                          </div>
                        )}
                      </td>

                      <td>
                        <strong>
                          {product.nombre}
                        </strong>

                        {product.descripcion && (
                          <p className="admin-table-description">
                            {
                              product.descripcion
                            }
                          </p>
                        )}
                      </td>

                      <td>
                        {product.brand
                          ?.nombre ??
                          "Sin marca"}
                      </td>

                      <td>
                        {product.category
                          ?.nombre ??
                          "Sin categoría"}
                      </td>

                      <td>
                        <span
                          className={
                            product.disponible
                              ? "admin-status admin-status--active"
                              : "admin-status admin-status--inactive"
                          }
                        >
                          {product.disponible
                            ? "Disponible"
                            : "No disponible"}
                        </span>
                      </td>

                    <td>
                        {product.fichaTecnica ? (
                            <a
                            href={getProductFileUrl(
                                product.fichaTecnica,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-table-file-link"
                            >
                            Ver PDF
                            </a>
                        ) : (
                            <span className="admin-no-file">
                            Sin ficha
                            </span>
                        )}
                    </td>

                      <td>
                        <div className="admin-row-actions">
                            <button
                                type="button"
                                className="admin-icon-button"
                                onClick={() =>
                                openEditModal(product)
                                }
                                aria-label={`Editar ${product.nombre}`}
                                title="Editar"
                            >
                                <FaPen />
                            </button>

                            <button
                                type="button"
                                className="admin-icon-button admin-icon-button--danger"
                                onClick={() =>
                                void handleDelete(product.id)
                                }
                                aria-label={`Eliminar ${product.nombre}`}
                                title="Eliminar"
                            >
                                <FaTrash />
                            </button>
                            </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={closeModal}
        >
          <div
            className="admin-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-modal-header">
              <div>
                <h2>
                  {selectedProduct
                    ? "Editar producto"
                    : "Nuevo producto"}
                </h2>

                <p>
                  Completa la información
                  general del producto.
                </p>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeModal}
                disabled={saving}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="admin-service-form"
            >
              {formError && (
                <div className="admin-form-error">
                  {formError}
                </div>
              )}

              <div className="admin-form-group">
                <label htmlFor="nombre">
                  Nombre del producto
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={
                    handleInputChange
                  }
                  maxLength={200}
                  placeholder="Ejemplo: Siemens SINAMICS G120"
                  disabled={saving}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="descripcion">
                  Descripción
                </label>

                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={
                    form.descripcion
                  }
                  onChange={
                    handleInputChange
                  }
                  rows={5}
                  placeholder="Describe las características principales del producto..."
                  disabled={saving}
                />
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                    <label htmlFor="brandId">
                        Marca
                    </label>

                    <select
                        id="brandId"
                        name="brandId"
                        value={form.brandId}
                        onChange={(event) => {
                        handleInputChange(event);

                        if (event.target.value) {
                            setNewBrandName("");
                        }
                        }}
                        disabled={
                        saving ||
                        Boolean(newBrandName.trim())
                        }
                    >
                        <option value="">
                        Selecciona una marca existente
                        </option>

                        {brands.map((brand) => (
                        <option
                            key={brand.id}
                            value={brand.id}
                        >
                            {brand.nombre}
                        </option>
                        ))}
                    </select>

                    <span className="admin-field-separator">
                        o escribe una nueva marca
                    </span>

                    <input
                        type="text"
                        value={newBrandName}
                        onChange={(event) => {
                        const value =
                            event.target.value;

                        setNewBrandName(value);

                        if (value.trim()) {
                            setForm((previousForm) => ({
                            ...previousForm,
                            brandId: "",
                            }));
                        }
                        }}
                        maxLength={100}
                        placeholder="Ejemplo: Siemens"
                        disabled={saving}
                    />

                    {newBrandName.trim() && (
                        <small className="admin-field-help">
                        Esta marca se guardará para
                        futuros productos.
                        </small>
                    )}
                    </div>

                <div className="admin-form-group">
                    <label htmlFor="categoryId">
                        Categoría
                    </label>

                    <select
                        id="categoryId"
                        name="categoryId"
                        value={form.categoryId}
                        onChange={(event) => {
                        handleInputChange(event);

                        if (event.target.value) {
                            setNewCategoryName("");
                        }
                        }}
                        disabled={
                        saving ||
                        Boolean(
                            newCategoryName.trim(),
                        )
                        }
                    >
                        <option value="">
                        Selecciona una categoría existente
                        </option>

                        {categories.map(
                        (category) => (
                            <option
                            key={category.id}
                            value={category.id}
                            >
                            {category.nombre}
                            </option>
                        ),
                        )}
                    </select>

                    <span className="admin-field-separator">
                        o escribe una nueva categoría
                    </span>

                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(event) => {
                        const value =
                            event.target.value;

                        setNewCategoryName(value);

                        if (value.trim()) {
                            setForm((previousForm) => ({
                            ...previousForm,
                            categoryId: "",
                            }));
                        }
                        }}
                        maxLength={100}
                        placeholder="Ejemplo: Automatización"
                        disabled={saving}
                    />

                    {newCategoryName.trim() && (
                        <small className="admin-field-help">
                        Esta categoría se guardará para
                        futuros productos.
                        </small>
                    )}
                    </div>
              </div>

                <div className="admin-form-group">
  <label>Imágenes del producto</label>

  <p className="admin-field-help">
    Puedes guardar hasta 3 imágenes.
    Formatos permitidos: JPG, PNG y WEBP.
    Máximo 5 MB por imagen.
  </p>

  {selectedProduct &&
    selectedProduct.imagenes.length >
      0 && (
      <div className="admin-product-images-grid">
        {selectedProduct.imagenes.map(
          (image) => (
            <div
              className="admin-product-image-card"
              key={image.id}
            >
              <img
                src={getProductFileUrl(
                  image.url,
                )}
                alt={
                  image.nombreArchivo
                }
              />

              <button
                type="button"
                className="admin-image-remove"
                onClick={() =>
                  void handleDeleteExistingImage(
                    image.id,
                  )
                }
                disabled={
                  saving ||
                  deletingImageId ===
                    image.id
                }
              >
                {deletingImageId ===
                image.id
                  ? "Eliminando..."
                  : "Eliminar"}
              </button>
            </div>
          ),
        )}
      </div>
    )}

  {imagePreviews.length > 0 && (
    <>
      <span className="admin-images-subtitle">
        Nuevas imágenes
      </span>

      <div className="admin-product-images-grid">
        {imagePreviews.map(
          (preview, index) => (
            <div
              className="admin-product-image-card"
              key={preview}
            >
              <img
                src={preview}
                alt={`Vista previa ${
                  index + 1
                }`}
              />

              <button
                type="button"
                className="admin-image-remove"
                onClick={() =>
                  removeSelectedImage(
                    index,
                  )
                }
                disabled={saving}
              >
                Quitar
              </button>
            </div>
          ),
        )}
      </div>
    </>
  )}

  {(selectedProduct?.imagenes
    ?.length ?? 0) +
    newImages.length <
    3 && (
    <label className="admin-file-input">
      <span>
        Seleccionar imágenes
      </span>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={
          handleImagesChange
        }
        disabled={saving}
      />
    </label>
  )}

  <small className="admin-field-help">
    {(selectedProduct?.imagenes
      ?.length ?? 0) +
      newImages.length}{" "}
    de 3 imágenes seleccionadas.
  </small>
</div>

<div className="admin-form-group">
  <label>Ficha técnica</label>

  <p className="admin-field-help">
    Archivo opcional en formato PDF.
    Tamaño máximo: 10 MB.
  </p>

  {selectedProduct?.fichaTecnica && (
    <div className="admin-technical-sheet-card">
      <div className="admin-technical-sheet-info">
        <span className="admin-pdf-icon">
          PDF
        </span>

        <div>
          <strong>
            Ficha técnica actual
          </strong>

          <small>
            Puedes consultarla, eliminarla
            o sustituirla.
          </small>
        </div>
      </div>

      <div className="admin-technical-sheet-actions">
        <a
          href={getProductFileUrl(
            selectedProduct.fichaTecnica,
          )}
          target="_blank"
          rel="noreferrer"
          className="admin-secondary-action"
        >
          Ver PDF
        </a>

        <button
          type="button"
          className="admin-danger-action"
          onClick={() =>
            void handleDeleteTechnicalSheet()
          }
          disabled={
            saving ||
            deletingTechnicalSheet
          }
        >
          {deletingTechnicalSheet
            ? "Eliminando..."
            : "Eliminar PDF"}
        </button>
      </div>
    </div>
  )}

  {technicalSheetFile && (
    <div className="admin-selected-technical-sheet">
      <div>
        <strong>
          {technicalSheetFile.name}
        </strong>

        <small>
          {(
            technicalSheetFile.size /
            1024 /
            1024
          ).toFixed(2)}{" "}
          MB
        </small>
      </div>

      <button
        type="button"
        className="admin-danger-action"
        onClick={
          removeSelectedTechnicalSheet
        }
        disabled={saving}
      >
        Quitar
      </button>
    </div>
  )}

  {!technicalSheetFile && (
    <label className="admin-file-input">
      <span>
        {selectedProduct?.fichaTecnica
          ? "Seleccionar un PDF para reemplazar"
          : "Seleccionar ficha técnica"}
      </span>

      <input
        type="file"
        accept="application/pdf,.pdf"
        onChange={
          handleTechnicalSheetChange
        }
        disabled={saving}
      />
    </label>
  )}

  {selectedProduct?.fichaTecnica &&
    technicalSheetFile && (
      <small className="admin-field-help">
        Al guardar, el PDF nuevo
        reemplazará automáticamente la
        ficha técnica actual.
      </small>
    )}
</div>

              <label className="admin-checkbox-field">
                <input
                  type="checkbox"
                  name="disponible"
                  checked={
                    form.disponible
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={saving}
                />

                <span>
                  Producto disponible
                </span>
              </label>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-secondary-action"
                  onClick={closeModal}
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
                    : selectedProduct
                      ? "Guardar cambios"
                      : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
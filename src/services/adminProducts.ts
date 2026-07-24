import api from "./api";

export interface AdminBrand {
  id: number;
  nombre: string;
}

export interface AdminCategory {
  id: number;
  nombre: string;
}

export interface ProductImage {
  id: number;
  url: string;
  nombreArchivo: string;
  orden: number;
}

export interface ProductFeature {
  id: number;
  nombre: string;
  valor: string;
}

export interface AdminProduct {
  id: number;
  nombre: string;
  descripcion: string | null;
  disponible: boolean;
  fichaTecnica: string | null;
  brand: AdminBrand;
  category: AdminCategory;
  imagenes: ProductImage[];
  caracteristicas: ProductFeature[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  nombre: string;
  descripcion?: string;
  disponible: boolean;
  brandId: number;
  categoryId: number;
}

export interface ProductFeaturePayload {
  nombre: string;
  valor: string;
  productId: number;
}

export async function getAdminProducts(): Promise<
  AdminProduct[]
> {
  const response = await api.get<AdminProduct[]>(
    "/products",
  );

  return response.data;
}

export async function getAdminProduct(
  id: number,
): Promise<AdminProduct> {
  const response = await api.get<AdminProduct>(
    `/products/${id}`,
  );

  return response.data;
}

export async function getBrands(): Promise<
  AdminBrand[]
> {
  const response = await api.get<AdminBrand[]>(
    "/brands",
  );

  return response.data;
}

export async function getCategories(): Promise<
  AdminCategory[]
> {
  const response = await api.get<AdminCategory[]>(
    "/categories",
  );

  return response.data;
}

export async function createProduct(
  payload: ProductPayload,
): Promise<AdminProduct> {
  const response = await api.post<AdminProduct>(
    "/products",
    payload,
  );

  return response.data;
}

export async function updateProduct(
  id: number,
  payload: ProductPayload,
): Promise<AdminProduct> {
  const response = await api.patch<AdminProduct>(
    `/products/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteProduct(
  id: number,
): Promise<void> {
  await api.delete(`/products/${id}`);
}

export async function uploadProductImages(
  productId: number,
  images: File[],
): Promise<ProductImage[]> {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("imagenes", image);
  });

  const response = await api.post<ProductImage[]>(
    `/product-images/upload/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function deleteProductImage(
  imageId: number,
): Promise<void> {
  await api.delete(`/product-images/${imageId}`);
}

export async function uploadTechnicalSheet(
  productId: number,
  file: File,
): Promise<AdminProduct> {
  const formData = new FormData();

  formData.append("fichaTecnica", file);

  const response = await api.post<{
    message: string;
    product: AdminProduct;
  }>(
    `/products/${productId}/ficha-tecnica`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.product;
}

export async function deleteTechnicalSheet(
  productId: number,
): Promise<void> {
  await api.delete(
    `/products/${productId}/ficha-tecnica`,
  );
}

export async function createProductFeature(
  payload: ProductFeaturePayload,
): Promise<ProductFeature> {
  const response = await api.post<ProductFeature>(
    "/product-features",
    payload,
  );

  return response.data;
}

export async function updateProductFeature(
  featureId: number,
  payload: Partial<ProductFeaturePayload>,
): Promise<ProductFeature> {
  const response = await api.patch<ProductFeature>(
    `/product-features/${featureId}`,
    payload,
  );

  return response.data;
}

export async function deleteProductFeature(
  featureId: number,
): Promise<void> {
  await api.delete(
    `/product-features/${featureId}`,
  );
}

export function getProductFileUrl(
  path: string | null | undefined,
): string {
  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const apiBaseUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

  return `${apiBaseUrl}${path}`;
}
 export interface CatalogPayload {
  nombre: string;
}

export async function createBrand(
  payload: CatalogPayload,
): Promise<AdminBrand> {
  const response = await api.post<AdminBrand>(
    "/brands",
    payload,
  );

  return response.data;
}

export async function createCategory(
  payload: CatalogPayload,
): Promise<AdminCategory> {
  const response = await api.post<AdminCategory>(
    "/categories",
    payload,
  );

  return response.data;
}
import api from "./api";

import type {
  ProvinurService,
  ServiceType,
} from "../types/service";

export interface ServicePayload {
  nombre: string;
  descripcion: string;
  activo: boolean;
  serviceTypeId: number;
}

export async function getAdminServices(): Promise<
  ProvinurService[]
> {
  const response = await api.get<ProvinurService[]>(
    "/services",
  );

  return response.data;
}

export async function getServiceTypes(): Promise<
  ServiceType[]
> {
  const response = await api.get<ServiceType[]>(
    "/service-types",
  );

  return response.data;
}

export async function createService(
  payload: ServicePayload,
): Promise<ProvinurService> {
  const response = await api.post<ProvinurService>(
    "/services",
    payload,
  );

  return response.data;
}

export async function updateService(
  id: number,
  payload: ServicePayload,
): Promise<ProvinurService> {
  const response = await api.patch<ProvinurService>(
    `/services/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteService(
  id: number,
): Promise<void> {
  await api.delete(`/services/${id}`);
}

export async function uploadServiceImages(
  serviceId: number,
  images: File[],
): Promise<ProvinurService> {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post<{
    message: string;
    service: ProvinurService;
  }>(
    `/services/${serviceId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.service;
}
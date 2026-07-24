import api from './api';
import type { ProvinurService } from '../types/service';

interface GetServicesOptions {
  serviceTypeId?: number;
  onlyActive?: boolean;
}

export async function getServices(
  options: GetServicesOptions = {},
): Promise<ProvinurService[]> {
  const response = await api.get<ProvinurService[]>(
    '/services',
    {
      params: options,
    },
  );

  return response.data;
}

export async function getServiceById(
  id: number,
): Promise<ProvinurService> {
  const response = await api.get<ProvinurService>(
    `/services/${id}`,
  );

  return response.data;
}

export function getServiceImageUrl(
  imagePath: string,
): string {
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://')
  ) {
    return imagePath;
  }

  const baseUrl =
    import.meta.env.VITE_API_URL ??
    'http://localhost:3000';

  return `${baseUrl}${imagePath}`;
}
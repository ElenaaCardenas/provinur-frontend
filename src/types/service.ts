export interface ServiceType {
  id: number;
  nombre: string;
  descripcion: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceImage {
  id: number;
  url: string;
  orden: number;
}

export interface ProvinurService {
  id: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  serviceType: ServiceType;
  images: ServiceImage[];
  createdAt: string;
  updatedAt: string;
}
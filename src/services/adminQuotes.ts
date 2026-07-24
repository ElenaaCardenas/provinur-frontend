import api from "./api";

export interface AdminQuote {
  id: number;
  nombre: string;
  empresa: string | null;
  correo: string;
  telefono: string;
  mensaje: string;
  atendido: boolean;
  createdAt: string;
}

export async function getQuotes(): Promise<AdminQuote[]> {
  const response = await api.get<AdminQuote[]>(
    "/contact-request",
  );

  return response.data;
}

export async function getQuote(
  id: number,
): Promise<AdminQuote> {
  const response = await api.get<AdminQuote>(
    `/contact-request/${id}`,
  );

  return response.data;
}

export async function updateQuote(
  id: number,
  atendido: boolean,
): Promise<AdminQuote> {
  const response = await api.patch<AdminQuote>(
    `/contact-request/${id}`,
    {
      atendido,
    },
  );

  return response.data;
}

export async function deleteQuote(
  id: number,
): Promise<void> {
  await api.delete(
    `/contact-request/${id}`,
  );
}
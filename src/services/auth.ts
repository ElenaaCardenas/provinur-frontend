import api from "./api";

export interface LoginCredentials {
  usuario: string;
  password: string;
}

export interface AuthUser {
  usuario: string;
  nombre: string;
}

interface LoginResponse extends AuthUser {
  token: string;
}

const TOKEN_KEY = "provinur_token";
const USER_KEY = "provinur_user";

export async function login(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  const { token, usuario, nombre } = response.data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      usuario,
      nombre,
    }),
  );

  return {
    usuario,
    nombre,
  };
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}
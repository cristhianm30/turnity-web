export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  loginMethod: string;
  createdAt: string;
  updatedAt: string;
  preferredName: string;
  role?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  preferredName: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: {
      token: string;
    };
    user: User;
  };
}

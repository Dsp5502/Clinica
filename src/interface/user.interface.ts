export interface UserRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest extends UserRequest {
  name: string;
  role: string;
}

export interface UserRegisterResponse {
  email: string;
  name: string;
  role: string;
  state: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserResponse {
  token: string | null;
  user: User | null;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

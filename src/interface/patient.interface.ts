export interface PatientRequest {
  id?: string;
  name: string;
  identification: string;
  last_name: string;
  age: number;
  phone: string;
}

export interface PatientResponse {
  name: string;
  identification: string;
  last_name: string;
  age: number;
  phone: string;
  state: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllPatientsParams {
  limit?: number;
  skip?: number;
  searchTerm?: string;
}

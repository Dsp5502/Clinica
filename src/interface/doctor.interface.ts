export interface DoctorRequest {
  id?: string;
  firstName: string;
  lastName: string;
  specialtyId: string;
  office: string;
  contactEmail: string;
}

export interface DoctorResponse {
  firstName: string;
  lastName: string;
  specialtyId: string;
  office: string;
  contactEmail: string;
  state: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllDoctorParams {
  limit?: number;
  skip?: number;
}

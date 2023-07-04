export interface GetAllMedicalAppointmentParams {
  limit?: number;
  skip?: number;
  searchTerm?: string;
}

export interface MedicalAppointmentRequest {
  documentPatient: string;
  specialtyId: string;
  appointmentDate: string;
  doctorId: string;
  patientId: string;
}

export interface MedicalAppointmentResponse {
  documentPatient: string;
  specialtyId: string;
  appointmentDate: string;
  doctorId: string;
  state: boolean;
  _id: string;
  patientId: string;
}

export interface GetAllMedicalAppointmentParams {
  limit?: number;
  skip?: number;
}

export interface MedicalAppointmentRequest {
  documentPatient: string;
  specialtyId: string;
  appointmentDate: string;
  doctorId: string;
}

export interface MedicalAppointmentResponse {
  documentPatient: string;
  specialtyId: string;
  appointmentDate: string;
  doctorId: string;
  state: boolean;
  _id: string;
}

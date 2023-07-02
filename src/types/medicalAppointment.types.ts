export interface MedicalsAppointmentsResponse {
  total: number;
  appointments: Appointment[];
}

export interface Appointment {
  _id: string;
  documentPatient: string;
  specialtyId: SpecialtyID;
  appointmentDate: string;
  doctorId: DoctorID;
  state: boolean;
}

export interface DoctorID {
  _id: string;
  firstName: string;
  lastName: string;
  contactEmail: string;
}

export interface SpecialtyID {
  _id: string;
  title: string;
}

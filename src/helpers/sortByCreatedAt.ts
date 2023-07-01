import { Doctor } from '../types/doctors.types';
import { Patient } from '../types/patient.types';

export const sortPatientsByCreatedAt = (patients: Patient[]): Patient[] => {
  return patients.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
};
export const sortDoctorsByCreatedAt = (doctors: Doctor[]): Doctor[] => {
  return doctors.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AllPatients, Patient } from '../../../types/patient.types';

const authToken = localStorage.getItem('authToken');
console.log('authToken', authToken);

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-clinica-obru.onrender.com',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${authToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPatients: builder.query<AllPatients, void>({
      query: () => '/patients',
    }),
    getPatient: builder.query<Patient, string>({
      query: (id) => `/patients/${id}`,
    }),
  }),
});

export const { useGetAllPatientsQuery, useGetPatientQuery } = patientsApi;

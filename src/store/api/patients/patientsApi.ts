import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { SerializedError } from '@reduxjs/toolkit';

import { RootState } from '../../store';

import {
  GetAllPatientsParams,
  PatientRequest,
  PatientResponse,
} from '../../../interface/patient.interface';

import type { AllPatients, Patient } from '../../../types/patient.types';

import { sortPatientsByCreatedAt } from '../../../helpers/sortByCreatedAt';

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-clinica-obru.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      } else {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          headers.set('authorization', `Bearer ${authToken}`);
        }
      }
      return headers;
    },
  }),

  tagTypes: ['Patients'],

  endpoints: (builder) => ({
    getAllPatients: builder.query<AllPatients, GetAllPatientsParams>({
      query: (params) => {
        const { limit, skip } = params;
        let url = '/patients';

        if (limit !== undefined && skip !== undefined) {
          url += `?limit=${limit}&skip=${skip}`;
        } else if (limit !== undefined) {
          url += `?limit=${limit}`;
        } else if (skip !== undefined) {
          url += `?skip=${skip}`;
        }
        return url;
      },
      providesTags: ['Patients'],
      transformResponse: (response: AllPatients) => {
        return {
          patients: sortPatientsByCreatedAt(response.patients),
          total: response.total,
        };
      },
      transformErrorResponse: (
        error
      ): FetchBaseQueryError | SerializedError => {
        return error;
      },
    }),

    getPatient: builder.query<Patient, string>({
      query: (id) => `/patients/${id}`,
    }),

    postPatient: builder.mutation<PatientResponse, PatientRequest>({
      query: (patient) => ({
        url: '/patients',
        method: 'POST',
        body: patient,
      }),
      invalidatesTags: ['Patients'],
    }),

    putPatient: builder.mutation<PatientResponse, PatientRequest>({
      query: (patient) => ({
        url: `/patients/${patient.id}`,
        method: 'PUT',
        body: patient,
      }),
      invalidatesTags: ['Patients'],
    }),

    deletePatient: builder.mutation<PatientResponse, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Patients'],
    }),
  }),
});

export const {
  useDeletePatientMutation,
  useGetAllPatientsQuery,
  useGetPatientQuery,
  usePostPatientMutation,
  usePutPatientMutation,
} = patientsApi;

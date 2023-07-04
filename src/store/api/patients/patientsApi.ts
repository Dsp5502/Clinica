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
        const { limit, skip, searchTerm } = params;
        let url = '/patients';

        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
          queryParams.append('limit', limit.toString());
        }
        if (skip !== undefined) {
          queryParams.append('skip', skip.toString());
        }

        if (searchTerm !== undefined) {
          queryParams.append('searchTerm', searchTerm);
        }

        if (queryParams.toString() !== '') {
          url += `?${queryParams.toString()}`;
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

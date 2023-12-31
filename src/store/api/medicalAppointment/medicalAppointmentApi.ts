import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../store';

import {
  GetAllMedicalAppointmentParams,
  MedicalAppointmentRequest,
  MedicalAppointmentResponse,
} from '../../../interface/medicalAppointment.interface';

import { MedicalsAppointmentsResponse } from '../../../types/medicalAppointment.types';

export const medicalAppointmentApi = createApi({
  reducerPath: 'medicalAppointmentApi',
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

  tagTypes: ['MedicalAppointment'],

  endpoints: (builder) => ({
    getAllMedicalAppointments: builder.query<
      MedicalsAppointmentsResponse,
      GetAllMedicalAppointmentParams
    >({
      query: (params) => {
        const { limit, skip, searchTerm } = params;
        let url = '/medicalAppointment';

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
      providesTags: ['MedicalAppointment'],
      transformResponse: (response: MedicalsAppointmentsResponse) => {
        return {
          appointments: response.appointments,
          total: response.total,
        };
      },
    }),

    postMedicalAppointment: builder.mutation<
      MedicalAppointmentResponse,
      MedicalAppointmentRequest
    >({
      query: (body) => ({
        url: '/medicalAppointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MedicalAppointment'],
    }),

    deleteMedicalAppointment: builder.mutation<
      MedicalAppointmentResponse,
      string
    >({
      query: (id) => ({
        url: `/medicalAppointment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MedicalAppointment'],
    }),
  }),
});

export const {
  useGetAllMedicalAppointmentsQuery,
  usePostMedicalAppointmentMutation,
  useDeleteMedicalAppointmentMutation,
} = medicalAppointmentApi;

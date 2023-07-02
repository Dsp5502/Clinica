import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../store';
import type { MedicalAppointmentResponse } from '../../../types/medicalAppointment.types';
import {
  GetAllMedicalAppointmentParams,
  MedicalAppointmentRequest,
} from '../../../interface/medicalAppointment.interface';

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
      MedicalAppointmentResponse,
      GetAllMedicalAppointmentParams
    >({
      query: (params) => {
        const { limit, skip } = params;
        let url = '/medicalAppointment';

        if (limit !== undefined && skip !== undefined) {
          url += `?limit=${limit}&skip=${skip}`;
        } else if (limit !== undefined) {
          url += `?limit=${limit}`;
        } else if (skip !== undefined) {
          url += `?skip=${skip}`;
        }
        return url;
      },
      providesTags: ['MedicalAppointment'],
      transformResponse: (response: MedicalAppointmentResponse) => {
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

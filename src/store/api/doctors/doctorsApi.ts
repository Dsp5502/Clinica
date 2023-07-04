import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../store';

import type { Doctor, DoctorsResponse } from '../../../types/doctors.types';
import {
  DoctorRequest,
  DoctorResponse,
  GetAllDoctorParams,
} from '../../../interface/doctor.interface';
import { sortDoctorsByCreatedAt } from '../../../helpers/sortByCreatedAt';

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
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

  tagTypes: ['Doctors'],

  endpoints: (builder) => ({
    getAllDoctors: builder.query<DoctorsResponse, GetAllDoctorParams>({
      query: (params) => {
        const { limit, skip, searchTerm } = params;
        let url = '/doctors';

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
      providesTags: ['Doctors'],
      transformResponse: (response: DoctorsResponse) => {
        return {
          doctors: sortDoctorsByCreatedAt(response.doctors),
          total: response.total,
        };
      },
    }),

    getDoctor: builder.query<Doctor, string>({
      query: (id) => `/doctors/${id}`,
    }),

    postDoctor: builder.mutation<DoctorResponse, DoctorRequest>({
      query: (doctor) => ({
        url: '/doctors',
        method: 'POST',
        body: doctor,
      }),
      invalidatesTags: ['Doctors'],
    }),

    putDoctor: builder.mutation<DoctorResponse, DoctorRequest>({
      query: (doctor) => ({
        url: `/doctors/${doctor.id}`,
        method: 'PUT',
        body: doctor,
      }),
      invalidatesTags: ['Doctors'],
    }),

    deleteDoctor: builder.mutation<DoctorResponse, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Doctors'],
    }),
  }),
});

export const {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
  useGetDoctorQuery,
  usePostDoctorMutation,
  usePutDoctorMutation,
} = doctorsApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../store';

import type { DoctorsResponse } from '../../../types/doctors.types';

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

  endpoints: (builder) => ({
    getAllDoctors: builder.query<DoctorsResponse, void>({
      query: () => '/doctors',
    }),
  }),
});

export const { useGetAllDoctorsQuery } = doctorsApi;

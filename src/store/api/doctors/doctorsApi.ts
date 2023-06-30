import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DoctorsResponse } from '../../../types/doctors.types';

const authToken =
  localStorage.getItem('authToken') ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRzcGFkbWluQGhvdG1haWwuY29tIiwiaWQiOiI2NDliNGQ3ZTFmNzcwZTU3MjE4OGRmZTYiLCJuYW1lIjoiQWRtaW5ST0xFLURBVklEIiwicm9sZSI6IkFETUlOX1JPTEUiLCJpYXQiOjE2ODc5OTk5MzcsImV4cCI6MTY4ODAxNDMzN30.djnJwwojOVJEOsKg9os9cN2wU5fdfE94Z1_BpmFL3SU';

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-clinica-obru.onrender.com',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${authToken}`);
      return headers;
    },
  }),
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAllDoctors: builder.query<DoctorsResponse, void>({
      query: () => '/doctors',
    }),
  }),
});

export const { useGetAllDoctorsQuery } = doctorsApi;

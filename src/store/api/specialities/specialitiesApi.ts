import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SpecialitiesResponse } from '../../../types/specialities.types';

export const specialitiesApi = createApi({
  reducerPath: 'specialitiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-clinica-obru.onrender.com',
  }),

  endpoints: (builder) => ({
    getAllSpecialities: builder.query<SpecialitiesResponse, void>({
      query: () => `/specialties`,
    }),
  }),
});

export const { useGetAllSpecialitiesQuery } = specialitiesApi;

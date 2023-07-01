import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  User,
  UserRegisterRequest,
  UserRegisterResponse,
  UserRequest,
} from '../../../interface/user.interface';

export interface UserResponse {
  user: User;
  token: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-clinica-obru.onrender.com',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, UserRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<UserRegisterResponse, UserRegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;

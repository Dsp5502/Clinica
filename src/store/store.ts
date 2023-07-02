import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { configureStore } from '@reduxjs/toolkit';

import { doctorsApi } from './api/doctors/doctorsApi';
import { medicalAppointmentApi } from './api/medicalAppointment/medicalAppointmentApi';
import { patientsApi } from './api/patients/patientsApi';
import { specialitiesApi } from './api/specialities/specialitiesApi';
import { userApi } from './api/user/userApi';

import userSlice from './slices/user/userSlice';
import specialitiesSlice from './slices/specilities/specialitiesSlice';

export const store = configureStore({
  reducer: {
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [medicalAppointmentApi.reducerPath]: medicalAppointmentApi.reducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    auth: userSlice,
    specialities: specialitiesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      doctorsApi.middleware,
      medicalAppointmentApi.middleware,
      patientsApi.middleware,
      specialitiesApi.middleware,
      userApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { configureStore } from '@reduxjs/toolkit';
import { doctorsApi } from './api/doctors/doctorsApi';
import { patientsApi } from './api/patients/patientsApi';
import { userApi } from './api/user/userApi';
import userSlice from './slices/user/userSlice';

export const store = configureStore({
  reducer: {
    [patientsApi.reducerPath]: patientsApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      patientsApi.middleware,
      doctorsApi.middleware,
      userApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

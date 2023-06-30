import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

import { User, UserResponse } from '../../../interface/user.interface';

const userSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as UserResponse,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

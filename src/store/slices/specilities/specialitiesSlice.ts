import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  SpecialitiesResponse,
  Speciality,
} from '../../../types/specialities.types';

const initialState: SpecialitiesResponse = {
  total: 0,
  patients: [],
};

const specialitiesSlice = createSlice({
  name: 'specialities',
  initialState,
  reducers: {
    setSpecialities: (state, action: PayloadAction<Speciality[]>) => {
      state.patients = action.payload;
    },
  },
});

export const { setSpecialities } = specialitiesSlice.actions;

export default specialitiesSlice.reducer;

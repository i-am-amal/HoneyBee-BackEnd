import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: null
};

const PhoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {
    SetNumber: (state, action) => {
      state.number = action.payload;
    },
    ClearNumber: (state) => {
      state.number = null; 
    }
  }
});

export const { SetNumber, ClearNumber } = PhoneSlice.actions;
const PhoneReducer = PhoneSlice.reducer;

export default PhoneReducer;

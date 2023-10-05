import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:null
}

const GoogleSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetGoogleUserData: (state, action) => {
      state.user = action.payload;
    },
    ClearGoogleUserData: (state) => {
      state.user = null; 
    }
  }
});

export const { SetGoogleUserData, ClearGoogleUserData } = GoogleSlice.actions;
const GoogleReducer = GoogleSlice.reducer

export default GoogleReducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:null
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetUserData: (state, action) => {
      state.user = action.payload;
    },
    ClearUserData: (state) => {
      state.user = null; 
    }
  }
});

export const { SetUserData, ClearUserData } = UserSlice.actions;
const UserReducer = UserSlice.reducer

export default UserReducer;

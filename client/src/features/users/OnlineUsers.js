import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    onlineUsers:[]
}

const onlineUserSlice = createSlice({
  name: 'onlineUsers',
  initialState,
  reducers: {
    SetOnlineUserData: (state, action) => {
      state.onlineUsers = action.payload;
    },
    ClearOnlineUserData: (state) => {
      state.onlineUsers = []; 
    }
  }
});

export const { SetOnlineUserData, ClearOnlineUserData } = onlineUserSlice.actions;
const OnlineUserReducer = onlineUserSlice.reducer

export default OnlineUserReducer;

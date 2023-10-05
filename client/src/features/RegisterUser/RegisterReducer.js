import { createSlice } from "@reduxjs/toolkit";

const initialState={
   newUser:false
}

const RegisterSlice=createSlice({
    name:'register',
    initialState,
    reducers:{
        SetUser:(state)=> {
            state.newUser= true
        },
        removeUser:(state)=>state.newUser=false
    }
})

export const {SetUser,removeUser}=RegisterSlice.actions

const RegisterReducer=RegisterSlice.reducer

export default RegisterReducer

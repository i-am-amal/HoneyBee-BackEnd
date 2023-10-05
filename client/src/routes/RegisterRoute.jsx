import React from "react";
import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'


const RegisterRoute=()=> {
    const registerState=useSelector(state=>state.register)
  return (
    registerState.newUser?<Outlet/>:<Navigate to='/login'/>
  )
}

export default RegisterRoute
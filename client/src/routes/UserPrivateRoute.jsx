import React from "react";
import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'


const UserPrivateRoute=()=> {
    const authState=useSelector(state=>state.auth)
  return (
    authState.auth?<Outlet/>:<Navigate to='/'/>
  )
}

export default UserPrivateRoute
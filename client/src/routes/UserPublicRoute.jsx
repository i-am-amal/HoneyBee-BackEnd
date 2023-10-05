import React from "react";
import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'


const UserPublicRoute=()=> {
    const authState=useSelector(state=>state.auth)
  return (
    authState.auth?<Navigate to='/Discover'/>:<Outlet/>
  )
}

export default UserPublicRoute
import React from "react";
import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'

function OtpRoute() {
    const PhoneState=useSelector(state=>state.phone)
  return PhoneState.number?<Outlet/>:<Navigate to='/login'/>
}

export default OtpRoute
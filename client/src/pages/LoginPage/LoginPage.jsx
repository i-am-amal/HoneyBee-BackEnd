import React from 'react'
import Login from '../../components/Login/Login'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import bgSvg from '/blob.svg'
import {useSelector,useDispatch} from 'react-redux'
import { SetGoogleUserData} from '../../features/users/GoogleReducer'
function LoginPage() {

  const {user}=useSelector(state=>state.google)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const name=params.get('fullName')


  useEffect(()=>{
    let userData=null
    if(email&&name){
       userData={
    fullName:name,
    email
  }
  }
    document.body.style.backgroundColor = "none";
    document.body.style.backgroundImage = `url(${bgSvg})`;
    if(userData){
      dispatch(SetGoogleUserData(userData))
    }

  },[])
  return (
    <div>
      <Navbar/>
        <Login/>
    </div>
  )
}

export default LoginPage
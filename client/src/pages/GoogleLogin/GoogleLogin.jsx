import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Auth_user } from "../../features/users/AuthReducer";
import { googleLoginApi } from '../../services/api';
import { SetUserData } from '../../features/users/UserReducer';
function GoogleLogin() {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    useEffect(()=>{
const data={
    email
}
googleLoginApi(data).then(res=>{
    if(res.data.success){
          dispatch(SetUserData(res.data.user))
        localStorage.setItem(
            "authorization.user",
            JSON.stringify(res.data.token)
          );
          dispatch(Auth_user());
          navigate(res.data.redirect);
    }else{
navigate('/')
    }
})
    },[])
  return (
    <div>
        
    </div>
  )
}

export default GoogleLogin
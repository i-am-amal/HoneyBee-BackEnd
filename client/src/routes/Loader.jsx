import React,{useState,useEffect} from "react";
import {Outlet,Navigate} from 'react-router-dom'
import IntialLoader from "../components/Loader/IntialLoader";

function Loader() {
  const [initial,setInitial]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{
    setInitial(false)
    },4000)
      },[])

  return initial?<IntialLoader/>:<Outlet/>
}

export default Loader
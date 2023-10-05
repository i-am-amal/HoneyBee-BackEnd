import React from 'react'
import Landing from '../../components/landingComponent/Landing'
import { useState } from 'react'
import { useEffect } from 'react'
import Logo from '../../components/logo/logo'
function LandingPage() {
  const [initial,setInitial]=useState(true)

  useEffect(()=>{
setTimeout(()=>{
setInitial(false)
},5000)
  },[])
  return (
    <div>
      {initial?<Logo/>: <Landing/>}
    </div>
  )
}

export default LandingPage




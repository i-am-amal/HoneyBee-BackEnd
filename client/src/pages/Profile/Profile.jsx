import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DiscoverSide from '../../components/Discover/DiscoverSide'
import UserProfile from '../../components/UserProfile/userProfile'
import EditProfile from '../../components/EditProfile/EditProfile'
import { useState } from 'react'

function Profile() {
  const [edit,setEdit]=useState(false)
  return (
    <div>
        <Navbar/>
       {!edit?<UserProfile edit={edit} setEdit={setEdit}/>:<EditProfile edit={edit} setEdit={setEdit}/>} 
        
    </div>
  )
}

export default Profile
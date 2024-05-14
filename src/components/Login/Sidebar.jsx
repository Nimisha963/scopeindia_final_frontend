import React, { useState } from 'react'
import SidebarStyle from './SidebarStyle.module.css'
import {Data} from './Data.jsx'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../reducers/UserReducer.js'
import axios from 'axios'

export default function Sidebar() {
  const user = useSelector(state=>state) 
  const dispatch = useDispatch()
  const handleLogout =()=>{
   dispatch(setLogout())
   try {
    axios.post('http://localhost:5000/scope/logout'
  ).then(res=>{
    alert(res.data.message)
  }).catch(err=>{
    alert(err.res.data.message)
  })
  } catch (error) {
    console.log(error)
  }
  }


  return (
    <div className={SidebarStyle.sidebar}>
        <Link className={SidebarStyle.active} to="/dashboard" >Dashboard</Link>
        <Link to='/courses'>Courses</Link>
        <Link to='/editprofile'>Edit Profile</Link>
        <Link to='/changepassword'>Change Password</Link>
        <Link to="/login" onClick ={handleLogout}>Logout</Link>
</div>
        
  )
}
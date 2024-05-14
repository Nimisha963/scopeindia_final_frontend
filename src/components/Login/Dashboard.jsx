import React, { useEffect, useState } from 'react'
import DashboardStyle from './DashboardStyle.module.css'
import {Data} from './Data.jsx'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import CoursesStyle from './CoursesStyle.module.css'
import background3 from './background3.jpg'
import background2 from '../Registration/background2.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {setCourses } from '../../reducers/UserReducer'
import axios from 'axios'

export default function Dashboard() {
  const [datas, setData] = useState([])
  const dispatch = useDispatch()
  const email = useSelector(state=>state.email)
  console.log(email)
  const temp = useSelector(state => state)
  let avatar = typeof temp.avatar === 'string' ? temp.avatar.split('scope')[1] : '';
  // const avatar = temp.avatar.split('scope')[1]
  console.log(avatar)
  const [filter,setFilter] = useState([])
  useEffect(()=>{
    handleCourses();
  },[])

  const handleCourses = () => {
    try{
    axios.post('http://localhost:5000/scope/dashboard',{
      email : email
    }).then(res=>{
      console.log(res)
      setData(res.data.courses)
      dispatch(setCourses({courses:res.data.courses}))
    }).catch(err =>{
      console.log(err)
    })
  } catch(err){
    console.log(err)
  }
  }
  const handleSearch =(e)=>{
    const search = e.target.value.toLowerCase()
    const newItems = datas.filter((item)=>(
      item.S1.toLowerCase().includes(search)
    ))
    setFilter(newItems)
  }

  return (
        <div style={{ backgroundImage: `url(${background2})`, backgroundAttachment: 'fixed',paddingBottom: '100%', minHeight:'100vh'}}>
        <Sidebar />
        <div className={DashboardStyle.content}>
        <p className={DashboardStyle.j1 + ' p-3 pb-0 shadow text-center'}>Dashboard</p>
        <h3 className ={'text-center mb-4 mx-auto p-3 col-lg-9 shadow'} style={{color:'white',textDecoration:'underline'}} >Your Profile</h3>
        <div className='text-center'>
        <img src={`http://localhost:5000/public/avatar/${avatar}`} style={{ width: "250px", height: '250px', borderRadius: '250px' }} /></div>
              <br /> <br />
        <div className ='p-1 offset-lg-5' style ={{color:'white'}}>Name : {temp.firstName} {temp.lastName} </div>
        <div className ='offset-lg-5 p-1' style ={{color:'white'}}>Date-of-birth : {temp.dob}</div>
        <div className ='offset-lg-5 p-1' style ={{color:'white'}}>Email : {temp.email}</div>
        <div className ='offset-lg-5 p-1' style ={{color:'white'}}>Contact Number : {temp.phone}</div>
        <div className ='offset-lg-5 p-1' style ={{color:'white'}}>Country : {temp.city}, {temp.states}, {temp.country}</div>
        <div className ='offset-lg-5 p-1' style ={{color:'white'}}>Hobbies : {temp.hobbies}</div>
        
        <h3 className ={'text-center mt-5 mb-5 mx-auto p-3 col-lg-9'} style={{color:'white',textDecoration:'underline'}} >Signed Up courses</h3>
        <input type='search' placeholder='Search courses here' className= 'mt-5 mb-5 w-50 form-control shadow offset-lg-3' onChange ={handleSearch}/>
        
        <div className = {CoursesStyle.k4 + ' p-5 mt-5 mb-4 mx-auto col-lg-9'}>
        <div className='row mt-3'>
          <h3 className ={CoursesStyle.k3 +' text-center p-3'}>Your courses</h3>
          {filter.length === 0 ? 
          datas.map((data,index)=>(
            <div key = {index} className='col-lg-6'>
            <div className='card my-lg-4 text-center'>
              <div className='card-body'>
              <div className='card-title'><h2>{data.S1}</h2></div>
              <div className='card-text'>Duration: {data.Duration} </div>
              <div className='card-text'> Fees : {data.Fees} </div>
              </div>
            </div>
            
            </div>
          
        )) : 
        filter.map((data,index) =>(
          <div key = {index} className='col-lg-6'>
            <div className='card my-lg-4 text-center'>
              <div className='card-body'>
              <div className='card-title'><h2>{data.S1}</h2></div>
              <div className='card-text'>Duration: {data.Duration} </div>
              <div className='card-text'> Fees : {data.Fees} </div>
              </div>
            </div>
            
            </div>
))}
        </div>
        </div>
        </div>
       </div>
        
  )
}

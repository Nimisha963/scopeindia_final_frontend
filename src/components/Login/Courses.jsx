import CoursesStyle from './CoursesStyle.module.css'
import { Data } from './Data.jsx'
import { Data1 } from './Data.jsx'
import { Data2 } from './Data.jsx'
import { Data3 } from './Data.jsx'
import { Data4 } from './Data.jsx'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import background3 from './background3.jpg'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Courses() {
  const email = useSelector(state=>state.email)
  const navigate = useNavigate()
  const [showCourses, setShowCourses] = useState({})
  const handleCourses = (courseName)=>{
    setShowCourses({...showCourses, [courseName]: !showCourses[courseName]}) //toggle showCourses
  }
  const handleSignup =(data)=>{
    try {
      axios.post('http://localhost:5000/scope/courses',{
        email : email,
        courses : data
      }).then(res=>{
        console.log(res.data.message)
        alert(res.data.message)
        navigate('/dashboard')
      }).catch(err=>{
        console.log(err)
        alert("You are already signed up for this course")
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Sidebar />
      <div style ={{backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight:'100vh'}}>
    <div className ={CoursesStyle.k6+ ' container'} style={{paddingBottom :'200px'}}>
        
    <p className={CoursesStyle.k1 + ' text-center pb-5'}>Courses</p>
            <div className={CoursesStyle.k4 + ' p-5 mx-auto col-9'}>
              <div className='row mb-5'>
                <h3 className={CoursesStyle.k3 + ' text-center p-3'}>Courses</h3>
                <button className={CoursesStyle.k5 + ' mt-5 p-2'} onClick={() => handleCourses('programming')}>Software Programming</button>
                {showCourses['programming'] && (
                  <div className='row'>
                    {Data1.map((data, index) => (
                      <div key={index} className='col-lg-4'>
                        <div className='card my-4 text-center'>
                          <div className='card-body'>
                            <div className='card-title'><h4>{data.S1}</h4></div>
                            <button type='button' className={CoursesStyle.k2 + ' p-2 px-5 mt-4'} onClick={()=>handleSignup(data)}>Sign up</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button className={CoursesStyle.k5 + ' mt-2 p-2'} onClick={() => handleCourses('testing')}>Software Testing</button>
                {showCourses['testing'] &&
                  <>
                    <div className='row'>
                      {Data2.map((data, index) => (
                        <div key={index} className='col-md-4 col-12'>
                          <div className='card my-4 text-center'>
                            <div className='card-body'>
                              <div className='card-title'><h4>{data.S1}</h4></div>
                              <button type='button' className={CoursesStyle.k2 + ' p-2 px-5 mt-4'}onClick={()=>handleSignup(data)}>Sign up</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>}
                <button className={CoursesStyle.k5 + ' mt-2 p-2'} onClick={() => handleCourses('networking')}>Networking,Sever & Cloud</button>
                {showCourses['networking'] &&
                  <>
                    <div className='row'>
                      {Data3.map((data, index) => (
                        <div key={index} className='col-lg-4'>
                          <div className='card my-4 text-center'>
                            <div className='card-body'>
                              <div className='card-title'><h4>{data.S1}</h4></div>
                              <button type='button' className={CoursesStyle.k2 + ' p-2 px-5 mt-4'} onClick={()=>handleSignup(data)}>Sign up</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>}
                <button className={CoursesStyle.k5 + ' mt-2 p-2'} onClick={() => handleCourses('other')}>Other Courses</button>
                {showCourses['other'] &&
                  <>
                    <div className='row'>
                      {Data4.map((data, index) => (
                        <div key={index} className='col-md-4 col-12'>
                          <div className='card my-4 text-center'>
                            <div className='card-body'>
                              <div className='card-title'><h4>{data.S1}</h4></div>
                              <button type='button' className={CoursesStyle.k2 + ' p-2 px-5 mt-4'} onClick={()=>handleSignup(data)}>Sign up</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>}
              </div>
            </div>
          </div>
        </div>
     
    </>
  )
}
import React, { useEffect, useState } from 'react'
import RegistrationStyle from '../Registration/RegistrationStyle.module.css'
import { useNavigate } from 'react-router-dom'
import background2 from '../Registration/background2.jpg'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {setLogin} from '../../reducers/UserReducer'

export default function Login() {
  const [detail, setDetail] = useState({
    email : '',
    password : ''
  })
  const [signedin,setSignedin] = useState(false)
  const[error,setError] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEmail =(e)=>{
   setDetail({...detail, email: e.target.value})
  }
  const handlePassword = (e)=>{
    setDetail({...detail, password: e.target.value})
  }
  const handleSignin = (e)=>{
    setSignedin(!signedin)
  }
  const handleLogin = (e) => {
    e.preventDefault()
    try {
      const temp = {}
      if(detail.email ===''){
        temp.email = 'Please enter your email'
      } else if(detail.password === ''){
        temp.password = 'Please enter your password'
      }
       if( Object.keys(temp).length>0){
        setError(temp)
      } else{
        setError({})
      
      axios.post('http://localhost:5000/scope/login',{
        email : detail.email,
        password : detail.password,
        signedin : signedin
      }).then(res=>{
        console.log(res.data)
        dispatch(setLogin({ token: res.data.token, avatar: res.data.avatar, password: detail.password, isFirstTime : res.data.isFirstTime, email : res.data.email, firstName: res.data.firstName, lastName: res.data.lastName, dob : res.data.dob, phone : res.data.phone, country : res.data.country, states : res.data.state, city : res.data.city,hobbies : res.data.hobbies}));
        alert('Log in successful and Welcome to Dashboard')
        navigate('/dashboard')
      }).catch(err => {
        console.log(err.response.data)
        setError({err_message : err.response.data.message})
        alert(err.response.data.message)
      })
     
    } }catch (error) {
      console.log(error)
    }
  }

  const handleForgotPassword =()=>{
    navigate('/forgotpassword')
  }
  return (
    <div style ={{backgroundImage: `url(${background2})`}}>
    <div className={RegistrationStyle.i1 + ' pb-5'}>
      <div className='container'>
        <div className={RegistrationStyle.i3}>
          <div className={RegistrationStyle.i4 + ' col-10 offset-1'}>
            <p className={RegistrationStyle.i5 + ' text-center pt-3'}>Login Form</p>
            <form className='p-5 mt-5' onSubmit={handleLogin}>
              <label htmlFor='email' className='col-md-2 col-12'>Email : </label>
              <input type='text' className={`border col-md-6 col-12 p-2 rounded ${error.email && 'is-invalid'}`} placeholder='Enter your email' onChange = {handleEmail} /> <br />
              <div className ='invalid-feedback'>{error.email}</div>

              <label htmlFor='password' className='col-md-2 col-12 pt-3'>Password : </label>
              <input type='password' className={`border col-md-6 col-12 p-2 rounded ${error.password && 'is-invalid'}`} onChange ={handlePassword}/> <br />
              <div className ='invalid-feedback pb-3'>{error.password}</div>

              <input type='checkbox' id='signedin' className='mx-4' onChange ={handleSignin} />
              <label htmlFor='signedin'>Keep me signed in </label> <br />
              <button type='submit' className={RegistrationStyle.i6 + ' p-2 px-5 mt-4 mx-lg-5'}>Login</button>
              <button type='button' className={RegistrationStyle.i6 + ' p-2 mt-4 mx-sm-2'} onClick = {handleForgotPassword}>Forgot password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

import React, { useState } from 'react'
import axios from 'axios'
import RegistrationStyle from '../Registration/RegistrationStyle.module.css'
import { useNavigate } from 'react-router-dom'
import background2 from '../Registration/background2.jpg'
import { useSelector } from 'react-redux'

export default function LoginFirst() {
  const [email, setEmail] = useState('')
  const [temppassword, setPassword] = useState('')
  const [error, setError] = useState({})
  const navigate = useNavigate()
  const temp = useSelector(state => state)
  const temperror = {}
  // console.log(temp)
  const [Temp, setTemp] = useState(false)
  const handleTemp = (e) => {
    try {
      e.preventDefault();
      if (email === '' || email !== temp.email) {
        temperror.email = 'Please enter a valid email'
      }
      if (Object.keys(temperror).length > 0) {
        setError(temperror)
      } else {
        setError({})
      
      axios.post('http://localhost:5000/scope/loginfirst', {
        email: email
      }).then(res => {
        console.log(res.data.message)
        alert('Check your email to get the temporary password')
        setTemp(!Temp)

      }).catch(err => {
        console.log(err)
        alert(err.response.data.message)
      })
    }} catch (err) {
      console.log(err)
    }
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLoginFirst = (e) => {
    e.preventDefault();
    if (temppassword === '') {
      temperror.password = 'Enter a valid password'
    }
    if (Object.keys(temperror).length > 0) {
      setError(temperror)
    } else {
      setError({})

      try {
        axios.post('http://localhost:5000/scope/temppassword', {
          temppassword: temppassword,
          firstName: temp.firstName,
          dob: temp.dob
        }).then(res => {
          console.log(res)

          alert(res.data.message)
          navigate('/changepasswordfirst')

        }).catch(e => {
          console.log(e)
          alert("Password doesn't match")
        })
      } catch (err) {
        console.log(err)
        alert(err.response.data.message)
      }
    }
  }
  return (
    <div style={{ backgroundImage: `url(${background2})`, paddingBottom: '30%', paddingTop: '40px' }}>
      <div className={RegistrationStyle.i1 + ' pb-5'}>
        <div className='container'>
          <div className={RegistrationStyle.i3}>
            <div className={RegistrationStyle.i4 + ' offset-lg-2 col-lg-8'}>
              <p className={RegistrationStyle.i5 + ' text-center pt-3'}>Login Form</p>
              <form className='p-5 mt-5'>
                <label htmlFor='email' className='col-md-2'>Email : </label>
                <input type='text' className={`border col-md-6 p-2 rounded ${error.email && 'is-invalid'}`} placeholder='Enter your email' onChange={handleEmail} /> <br />
                <div className='invalid-feedback'>{error.email}</div>
                <button type='submit' className={RegistrationStyle.i6 + ' pt-1 pb-1 mt-4 mx-lg-5'} onClick={handleTemp}>Get temporary Password</button> <br /><br />

                {Temp &&
                  <>
                    <label htmlFor='password' className='col-md-2'>Password : </label>
                    <input type='password' className={`border col-md-6 p-2 rounded ${error.password && 'is-invalid'}`} onChange={handlePassword} /> <br />
                    <div className='invalid-feedback'>{error.password}</div>

                    <button type='submit' className={RegistrationStyle.i6 + ' p-2 px-5 mt-4 mx-5'} onClick={handleLoginFirst}>Login</button>
                  </>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import ChangePasswordStyle from './ChangePasswordStyle.module.css'
import Sidebar from './Sidebar'
import background3 from './background3.jpg'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLogout } from '../../reducers/UserReducer'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
  const email = useSelector(state => state.email)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState({
    oldpassword: '',
    newpassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const temperror = {}
      if (data.oldpassword === '') {
        temperror.oldpassword = 'Enter the old password'

      } else if (data.newpassword === '') {
        temperror.newpassword = 'Enter the new password'
      }
      if (Object.keys(temperror).length > 0) {
        setErrors(temperror)
      } else {
        setErrors({})
        axios.post('http://localhost:5000/scope/changepassword', {
          email: email,
          oldpassword: data.oldpassword,
          newpassword: data.newpassword
        }).then(res => {
          console.log(res.data.message)
          alert(res.data.message)
          dispatch(setLogout())
          navigate('/login')
        }).catch(err => {
          console.log(err)
          alert(err.response.data.message)
        })
      }
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }

  return (
    <>
      <div style={{ backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '50px' }}>

        <div className={ChangePasswordStyle.l1}>
          <Sidebar />
          <div className={ChangePasswordStyle.content}>
            <div className='container'>
              <div style={{ borderRadius: '10px' }} className={ChangePasswordStyle.l3 + ' bg-light shadow offset-lg-1 col-lg-9'}>
                <p className={ChangePasswordStyle.l4 + ' text-center p-3'}>Change Password</p>
                <form className='p-5 mt-5' onSubmit={handleSubmit}>
                  <label htmlFor='oldpassword' className=' form-label' >Type Existing password : </label>
                  <input type='password' id='oldpassword' className={`form-control ${errors.oldpassword && 'is-invalid'}`} onChange={handleChange} /> <br />
                  {errors.oldpassword && <div className='invalid-feedback pb-2'>{errors.oldpassword}</div>}
                  <label htmlFor='newpassword' className='form-label'>Type New Password : </label>
                  <input type='password' className={`form-control ${errors.newpassword && 'is-invalid'}`} id='newpassword' onChange={handleChange} /> <br />
                  {errors.newpassword && <div className='invalid-feedback'>{errors.newpassword}</div>}
                  <div className='text-center'>
                    <button type='submit' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'}>Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

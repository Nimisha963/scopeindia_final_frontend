import React, { useEffect, useState } from 'react'
import ChangePasswordStyle from '../Login/ChangePasswordStyle.module.css'
import background3 from '../Login/background3.jpg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [userotp, setUserOTP] = useState('')
  const [otp,setOTP] = useState('')
  const navigate = useNavigate()
  const [appear, setAppear] = useState(true)
  const [submit, setSubmit] = useState(true)
  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState({
    type : '',
    new : ''
  })
  const temperror = {}

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleOTP = (e) => {
    setUserOTP(e.target.value)
  }
  const handleGetOtp = (e) => {
    e.preventDefault()
    try{
    if (email === '') {
     temperror.email = 'Enter email address'
    } 
   if(Object.keys(temperror).length>0){
    setErrors(temperror)
   } else {
    setErrors({})
    axios.post('http://localhost:5000/scope/forgotpassword',{
      email : email
    }).then(res=>{
      console.log(res.data.message)
      alert(res.data.message)
      console.log(res.data.otp)
      setOTP(res.data.otp)
      setAppear(!appear)
    }).catch(err=>{
      alert(err.response.data.message)
    })
   }} catch(err) {
    console.log(err)
   }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting OTP:', userotp, otp)
    try {
      if(userotp ==''){
        temperror.userotp = 'Enter the OTP'
      }
      if(Object.keys(temperror).length>0){
        setErrors(temperror)
      } else{
        setErrors({})
      axios.post('http://localhost:5000/scope/forgotpasswordsubmitotp',{
        userotp : userotp,
        otp : otp
      }).then(res=>{
        alert(res.data.message);
        setSubmit(!submit)
      }).catch(err=>{
        console.log(err);
        alert(err.response.data.message);
      })
    }} catch (error) {
      console.log(error);
      alert('Error catch: ' + error)
    }
  }
  const handlePassword=(e)=>{
    setPassword({...password, [e.target.id]:e.target.value});
  }
  const handleConfirm=(e)=>{
    e.preventDefault();
    try{
    if(password.type ===''){
      temperror.type = 'Enter the password'
    } else if (password.new ===''){
      temperror.new = 'Enter the password'
    }
    if (Object.keys(temperror).length > 0){
      setErrors(temperror)
    }else{
      setErrors({})
      if(password.type === password.new){
      axios.post('http://localhost:5000/scope/forgotpasswordsubmit',{
        email : email,
        password : password.new
      }).then(res=>{
        alert(res.data.message)
        navigate('/login')
      }).catch(err=>{
        alert(err.response.data.message)
      })
    } else{
      setErrors({mismatch : 'Password mismatch'})
    }}
  }catch(err){
    console.log(err)
  }
}
  return (
    <>
      <div style={{ backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '50px', paddingTop: '10px' }}>
        <div className={ChangePasswordStyle.l1}>
          <div className='container'>
            <div style ={{borderRadius:'10px'}}className={ChangePasswordStyle.l3 + ' bg-light shadow offset-md-2 col-md-8 offset-md-2'}>
              <p className={ChangePasswordStyle.l4 + ' text-center p-3'}>Forgot Password</p>
              <form className='p-5 mt-5'>
                 {submit ?
                 appear ? 
                  <>
                    <label htmlFor='exist' className=' form-label'>Enter email address: </label>
                    <input type='email' className={`form-control ${errors.email && 'is-invalid'}`} onChange={handleEmail} /> <br />
                    {errors.email && <div className ='invalid-feedback'>{errors.email}</div>}
                    <div className='text-center'>
                      <button type='button' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'} onClick={handleGetOtp}>GetOTP</button>
                    </div>
                    </>
                    :
                      <>
                        <label htmlFor='exist' className=' form-label'>Enter OTP: </label>
                        <input type='text' className={`form-control ${errors.userotp && 'is-invalid'}`} pattern='[0-9]{4,4}' onChange={handleOTP} value ={userotp}/> <br />
                        {errors.userotp && <div className ='invalid-feedback'>{errors.userotp}</div>}
                        <div className='text-center'>
                          <button type='button' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'} onClick={handleSubmit}>Submit</button>
                        </div>

                      </>
                    
                  
                :
                 
                 
                  <>
                    <label htmlFor='password' className='form-label'>Type New Password : </label>
                    <input type='password' className={`form-control ${errors.type && 'is-invalid'}`} value={password.type} id='type' onChange ={handlePassword}/> <br />
                    {errors.type && <div className ='invalid-feedback'>{errors.type}</div>}
                    <label htmlFor='password' className='form-label pt-2'>Confirm New Password : </label>
                    <input type='password' className={`form-control ${(errors.new || errors.mismatch) && 'is-invalid'}`} value={password.new} onChange ={handlePassword} id='new'/> <br />
                    {errors.new && <div className ='invalid-feedback'>{errors.new}</div>}
                    {errors.mismatch && <div className = 'invalid-feedback'>{errors.mismatch}</div>}
                    <div className='text-center'>
                      <button type='button' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'} onClick ={handleConfirm}>Confirm</button>
                    </div>
                  </>
                
                }
              </form>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

















// import React, { useState } from 'react'
// import ChangePasswordStyle from '../Login/ChangePasswordStyle.module.css'
// import background3 from '../Login/background3.jpg'

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('')
//   const [otp, setOTP] = useState('')
//   const [errors, setErrors] = useState({})
//   const cred = {
//     email: 'sara@gmail.com',
//     otp: '1234'
//   }
//   const handleEmail = (e) => {
//     setEmail(e.target.value)
//   }
//   const handleOTP = (e) => {
//     setOTP(e.target.value)
//   }
//   const handleGetOtp =(e)=>{
//     e.preventDefault()
//     if(email === cred.email){
//       alert('OTP sent successfully')
//       setErrors({error:''})
//     }else{
//       alert('Invalid Email Address')
//       setErrors({error:"Invalid Email Address"})
//     }
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if(otp === cred.otp) {
//       alert('Success')
//       setErrors({errorsubmit : ''})
//     } else{
//       alert('Invalid OTP')
//       setErrors({errorsubmit:"Invalid OTP"})
//     }
//   }
//   return (
//     <>
//       <div style={{ backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '50px', paddingTop: '10px' }}>
//         <div className={ChangePasswordStyle.l1}>

//           <div className='container'>
//             <div className={ChangePasswordStyle.l3 + ' bg-light shadow'}>
//               <p className={ChangePasswordStyle.l4 + ' text-center p-3'}>Forgot Password</p>
//               <form className='p-5 mt-5'>
                
//                 <label htmlFor='exist' className=' form-label'>Enter email address: </label>
//                 <input type='email' className='form-control' onChange={handleEmail} /> <br />
//                 <div className='text-center'>
//                   <button type='button' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'} onClick = {handleGetOtp}>GetOTP</button>
//                 </div>
//                 {errors.error !== '' ? (
//                   <div className='text-danger'>{errors.error}</div>
//                 ) : (
//                 <>
//                   <label htmlFor='exist' className=' form-label'>Enter OTP: </label>
//                 <input type='text' className='form-control' pattern='[0-9]{4,4}' onChange={handleOTP} /> <br />
//                 <div className='text-center'>
//                   <button type='button' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'} onClick = {handleSubmit}>Submit</button>
//                 </div>
                
//                 </>
//                 )}
              
//               {errors.errorsubmit !== '' ? (
//                   <div className='text-danger'>{errors.error}</div>
//                 ) : (
//                 <>
//                 <label htmlFor='password' className='form-label'>Type New Password : </label>
//                 <input type='password' className='form-control' /> <br />
//                 <div className='text-center'>
//                   <button type='button' className={ChangePasswordStyle.l2 + ' px-4 py-2 mt-4'}>Confirm</button>
//                 </div>
//                 </>
//                 )}
//               </form>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

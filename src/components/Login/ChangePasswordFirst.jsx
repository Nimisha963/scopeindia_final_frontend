import React from 'react'
import axios from 'axios'
import ChangePasswordStyle from './ChangePasswordStyle.module.css'
import background3 from './background3.jpg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function ChangePasswordFirst() {
    const [password, setPassword] = useState('')
    const tempemail = useSelector(state=>state.email)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const handlenewPassword =(e) => {
        setPassword(e.target.value)
    }
    const handleSave = (e) => {
        try{
        e.preventDefault()
        const temperror ={}
        if(password === ''){
            temperror.password = 'Enter a valid password'
        }
        if(Object.keys(temperror).length>0){
            setError(temperror)
        }else{
            setError({})

        axios.post('http://localhost:5000/scope/changepasswordfirst',{
            email : tempemail,
            passwordfirst : password,
        }).then(res=>{
            console.log(res)
            alert(res.data.message)
            navigate('/login')
        }).catch(err=>{
            alert(err.response.data.message)
        })
    }
}
 catch (err) {
    console.log(err)
}
    }
    return (
        <>
            <div style={{ backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '100%' }}>

                <div className={ChangePasswordStyle.l1}>
                    <div style={{ padding: '1px 16px' }}>
                        <div className='container'>
                            <div style={{borderRadius:'10px'}} className={ChangePasswordStyle.l3 + ' bg-light shadow offset-lg-1 col-lg-10'}>
                                <p className={ChangePasswordStyle.l4 + ' text-center p-3'}>Change Password</p>
                                <form className='p-5 mt-5' onSubmit ={handleSave}>
                                    <label htmlFor='password' className='form-label'>Type New Password : </label>
                                    <input type='password' className={`form-control ${error.password && 'is-invalid'}`} onChange = {handlenewPassword}/> <br />
                                    <div className='invalid-feedback'>{error.password}</div>
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

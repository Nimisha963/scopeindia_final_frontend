import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import ContactUsStyle from './ContactUs.module.css'
import customer from './custom.png'
import { Locations } from './Locations'
import background3 from '../Login/background3.jpg'
import axios from 'axios'


function ContactUs() {
    const [contact,setContact] = useState({
        name : '',
        email :'',
        subject : '',
        message : ''
    })
    const [errors,setError] = useState({})
    const handleContact = (e) =>{
        setContact({...contact, [e.target.id]:e.target.value})
    }
   const handleEmail = (e) =>{
    e.preventDefault()
    try {
        const temperror = {}
        if(contact.name ===''){
            temperror.name = 'Enter your name'
        } else if(contact.email===''){
            temperror.email = 'Enter your email'
        } else if(contact.subject===''){
            temperror.subject = 'Enter the subject'
        } else if(contact.message === ''){
            temperror.message = 'Enter the message'
        }
        if(Object.keys(temperror).length>0){
            setError(temperror)
        }else{
            setError({})
            axios.post('http://localhost:5000/scope/contact',{
                name : contact.name,
                email : contact.email,
                subject : contact.subject,
                message : contact.message
            }).then(res=>{
                console.log(res.data.message)
                alert(res.data.message)
                setContact({
                name : '',
                email : '',
                subject : '',
                message : ''
                })
            }).catch(err=>{
                console.log(err.response.date.message)
                alert(err.response.date.message)
            })
        }
    } catch (error) {
        console.log(error)
    }
   }
    return (
        <>
           <div style ={{backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', paddingBottom: '50%'}}>
            <div className = 'container'>
            <div className= {ContactUsStyle.h1 + ' text-center offset-lg-1 col-lg-10'}>
            <p className= {ContactUsStyle.h2 + ' text-center pt-5 pb-5'}>Contact US</p>
                <div className='text-center mx-auto col-8'>
                <div className='row'>
                    <div className = { ContactUsStyle.h3 + ' col-lg-5 col-12 my-5 p-3 mb-5'}> 
                    <p>SCOPE INDIA is open 365 days a year </p>
                    <img src ={customer} alt='customer' className='img-fluid'/>
                    <p>Let's discuss your career, 24/7 free Consultation</p>
                    </div>
                    <div className='col-lg-7 col-12 mt-5 pt-5 pb-5'>
                        <p className ={ContactUsStyle.h4}>CONTACT FORM</p>
                        <div className ='px-5'>
                        <form>
                        <input type="text" placeholder='Enter your name' className={`form-control mb-3 mt-5 ${errors.name && 'is-invalid' }`} onChange ={handleContact} id='name' value={contact.name}/> 
                        {errors.name && <div className ='invalid-feedback'>{errors.name}</div>}
                        <input type="text" placeholder='Enter your email' className={`form-control mb-3 ${errors.email && 'is-invalid' }`} onChange ={handleContact} id='email' value={contact.email}/>
                        {errors.email && <div className ='invalid-feedback'>{errors.email}</div>}
                        <input type="text" placeholder='Enter the subject'  className={`form-control mb-3 ${errors.subject && 'is-invalid' }`} onChange ={handleContact} id='subject'value={contact.subject}/>
                        {errors.subject && <div className ='invalid-feedback'>{errors.subject}</div>}
                        <textarea type="text" placeholder='Enter the message'  className={`form-control mb-3 ${errors.message && 'is-invalid' }`} onChange ={handleContact} id='message' value={contact.message}/>
                        {errors.message && <div className ='invalid-feedback'>{errors.message}</div>}
                        <Link className = {ContactUsStyle.h5 + ' mt-3 p-1 w-50'} onClick = {handleEmail} >Send Email</Link>
                        </form>
                        </div>
                    </div>
                </div>
                </div>
                  
                </div>
            </div>
            </div>
        </>
    )
}

export default ContactUs
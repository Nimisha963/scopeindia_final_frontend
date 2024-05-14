import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RegistrationStyle from './RegistrationStyle.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import background2 from './background2.jpg'
import { setRegistration } from '../../reducers/UserReducer'

function Registration() {
    const dispatch = useDispatch()
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        male: '',
        female: '',
        gender: '',
        dob: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        hobbies: [],
        courses:[],
        avatar: null,
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const countries = [{
        country_name: 'India',
        state:
            [{
                state_name: 'Kerala',
                city: [{ city_name: 'Trivandrum' }, { city_name: 'Kollam' }, { city_name: 'Kochi' }, { city_name: 'Kottayam' }, { city_name: 'Palakkad' }]
            },
            {
                state_name: 'Tamil Nadu',
                city: [{ city_name: 'Chennai' }, { city_name: 'Salem' }, { city_name: 'Madurai' }, { city_name: 'Coimbatore' }, { city_name: 'Thanjavur' }]
            },
            {
                state_name: 'Karnataka',
                city: [{ city_name: 'Bengaluru' }, { city_name: 'Uduppi' }, { city_name: 'Kolar' }, { city_name: 'Ballari' }, { city_name: 'Hassan' }]
            },
            {
                state_name: 'Telangana',
                city: [{ city_name: 'Hyderabad' }, { city_name: 'Warangal' }, { city_name: 'Nizamabad' }, { city_name: 'Khammam' }, { city_name: 'Karimnagar' }]
            },
            {
                state_name: 'Maharashtra',
                city: [{ city_name: 'Mumbai' }, { city_name: 'Aurangabad' }, { city_name: 'Amravati' }, { city_name: 'Thane' }, { city_name: 'Solapur' }]
            }]
    },
    {
        country_name: 'USA',
        state:
            [{
                state_name: 'Texas',
                city: [{ city_name: 'Houston' }, { city_name: 'Austin' }, { city_name: 'Dallas' }]
            },
            {
                state_name: 'California',
                city: [{ city_name: 'San Francisco' }, { city_name: 'Los Angeles' }, { city_name: 'fresno' }]
            }]
    }, {
        country_name: 'Canada',
        state:
            [{
                state_name: 'Nova Scotia',
                city: [{ city_name: 'Truro' }, { city_name: 'New Glasgow' }, { city_name: 'Yarmouth' }]
            },
            {
                state_name: 'Ontario',
                city: [{ city_name: 'Toronto' }, { city_name: 'Ottawa' }, { city_name: 'Kingston' }]
            }]
    }]


    const handleChange = (e) => {
        if (e.target.id !== 'avatar') {
            if (e.target.id === 'male' || e.target.id === 'female') {
                if (e.target.id === 'male') {
                    setDetails({ ...details, gender: 'male' });
                } else if (e.target.id === 'female') {
                    setDetails({ ...details, gender: 'female' });
                }
            } else if (e.target.checked) {
                setDetails({ ...details, hobbies: [...details.hobbies, e.target.id] });
           } else {
                setDetails({ ...details, [e.target.id]: e.target.value })
            }
        } else {
            setDetails({ ...details, [e.target.id]: e.target.files[0] })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let year = new Date(details.dob).getFullYear()
        let currentYear = new Date(Date.now()).getFullYear()
        const temperror = {}
        if (details.firstName === '') {
            temperror.firstName = 'Please enter your first name'
        } else if (details.lastName === '') {
            temperror.lastName = 'Please enter your last name'
        } else if (details.email === '') {
            temperror.email = 'Please enter your Email id'
        } else if (details.gender === '') {
            temperror.gender = 'Please enter your gender'
        } else if (details.dob === '') {
            temperror.dob = 'Please enter your date of birth'
        } else if(currentYear-year <18){
            temperror.dob = 'You are below 18 years old'
        } else if (details.phone === '') {
            temperror.phone = 'Please enter your phone number'
        } else if (details.country === '') {
            temperror.country = 'Please enter your country'
        } else if (details.state === '') {
            temperror.state = 'Please enter your state'
        } else if (details.city === '') {
            temperror.city = 'Please enter your city'
        } else if (details.hobbies.length === 0) {
            temperror.hobbies = 'Please select atleast one hobby'
        } else if (details.avatar === null) {
            temperror.avatar = 'Please upload avatar'
        }
        if (Object.keys(temperror).length > 0) {
            setErrors(temperror)
        } else {
            setErrors({})

            const userExists = await checkUserExists(details.email);
            if (userExists) {
                alert('User already registered');
                return;
            }

            const isFirstTime = true
            console.log("Avatar:", details.avatar)
            console.log("Hobbies:", details.hobbies)
            dispatch(setRegistration({ firstName: details.firstName, lastName : details.lastName,gender : details.gender, dob: details.dob, email: details.email, avatar: details.avatar, phone:details.phone, country:details.country, states: details.state, city : details.city, hobbies: details.hobbies}));
            const formdata = new FormData()
            formdata.append('firstName', details.firstName)
            formdata.append('lastName', details.lastName)
            formdata.append('email', details.email)
            formdata.append('password', '')
            formdata.append('gender', details.gender)
            formdata.append('dob', details.dob)
            formdata.append('phone', details.phone)
            formdata.append('country', details.country)
            formdata.append('state', details.state)
            formdata.append('city', details.city)
            formdata.append('hobbies', details.hobbies)
            formdata.append('courses',[])
            if (details.avatar) {
                formdata.append('avatar', details.avatar);
            }
            formdata.append('isFirstTime', isFirstTime)
            axios.post('http://localhost:5000/scope/register', formdata, {
                headers: {
                    'Content-Type': 'application/multipart/form-data'
                }
            })
                .then((res) => {
                    alert(res.data.message)
                    console.log(res)
                    navigate('/loginfirst')
                    setDetails({
                        firstName: '',
                        lastName: '',
                        email: '',
                        male: '',
                        female: '',
                        gender: '',
                        dob: '',
                        phone: '',
                        country: '',
                        state: '',
                        city: '',
                        singing: '',
                        dancing: '',
                        drawing: '',
                        gardening: '',
                        hobbies: [],
                        avatar: null
                    })
                    
                })
                .catch((err) => {
                    alert(err.response.data.message)
                    console.log(err)
                })
        }
    }
    const checkUserExists = async (email) => {
        try {
            const response = await axios.post('http://localhost:5000/scope/checkUser', { email });
            return response.data.exists;
        } catch (error) {
            console.error('Error checking user:', error);
            return false; // Handle error 
        }
    };


    return (
        <>
            <div style={{ backgroundImage: `url(${background2})` }}>
                <div className={RegistrationStyle.i1}>
                    <div className='container'>
                        <div className={RegistrationStyle.i3 + ' m-5'}>
                            <div className={RegistrationStyle.i4 + ' col-lg-10 offset-lg-1'}>
                                <p className={RegistrationStyle.i5 + ' text-center pt-3'}>Registration Form</p>
                                <form className='p-5' onSubmit={handleSubmit}>

                                    <label htmlFor='firstName' className='col-md-2'>First name : </label>
                                    <input type='text' id='firstName' placeholder='Enter your first name?' className={`border col-md-6 p-2 rounded col-12 ${errors.firstName && 'is-invalid'}`} onChange={handleChange} /> <br />
                                    {errors.firstName && <div className='invalid-feedback pb-2 mt-0'>{errors.firstName}</div>}  <br />

                                    <label htmlFor='lastName' className='col-md-2 col-12 '>Last name : </label>
                                    <input type='text' id='lastName' placeholder='Enter your last name?' className={`border col-md-6 p-2 rounded col-12 ${errors.lastName && 'is-invalid'}`} onChange={handleChange} /> <br /> <br />
                                    {errors.lastName && <div className='invalid-feedback pb-2 mt-0'>{errors.lastName}</div>}

                                    <label htmlFor='email' className='col-md-2 col-12 '>Email : </label>
                                    <input type='email' id='email' placeholder='Enter your Email id?' className={`border col-md-6 p-2 rounded col-12 ${errors.email && 'is-invalid'}`} onChange={handleChange} /> <br /> <br />
                                    {errors.email && <div className='invalid-feedback pb-2 mt-0'>{errors.email}</div>}

                                    <label htmlFor='gender' className='col-md-2'>Gender : </label>
                                    <input type='radio' id='male' name='gender' onChange={handleChange} className={`${errors.gender && 'is-invalid'}`} />
                                    <label htmlFor='male' className='px-4' >Male</label> &nbsp;
                                    <input type='radio' id='female' name='gender' onChange={handleChange} className={`${errors.gender && 'is-invalid'}`} />
                                    <label htmlFor='female' className='px-4'>Female</label> <br />
                                    {errors.gender && <div className='invalid-feedback pb-2 mt-0'>{errors.gender}</div>} <br />

                                    <label htmlFor='dob' className='col-md-2 col-12' >Date of birth : </label>
                                    <input type='date' id='dob' placeholder='Enter your date-of-birth' className={`border col-md-6 p-2 rounded col-12 ${errors.dob && 'is-invalid'}`} onChange={handleChange} /> <br />
                                    {errors.dob && <div className='invalid-feedback pb-2 mt-0'>{errors.dob}</div>} <br />

                                    <label htmlFor='phone' className='col-md-2 col-12'>Contact Number : </label>
                                    <input type='tel' id='phone' placeholder='Enter your contact number' className={`border col-md-6 p-2 rounded col-12 ${errors.phone && 'is-invalid'}`} onChange={handleChange} /> <br />
                                    {errors.phone && <div className='invalid-feedback pb-2 mt-0'>{errors.phone}</div>} <br />

                                    <label htmlFor='country' className='col-md-2 col-12'>Country : </label>
                                    <select id='country' className={`border col-md-6 p-2 rounded col-12 ${errors.country && 'is-invalid'}`} onChange={handleChange}>
                                        <option readonly>Select Country</option>
                                        {countries.map(item => (
                                            <option value={item.country_name} key={item.country_name} name={item.country_name}>{item.country_name}</option>
                                        )
                                        )}
                                    </select> <br />
                                    {errors.country && <div className='invalid-feedback'>{errors.country}</div>} <br />

                                    <label htmlFor='state' className='col-md-2 col-12' >State : </label>
                                    <select id='state' className={`border col-md-6 p-2 rounded col-12 ${errors.state && 'is-invalid'}`} onChange={handleChange}>
                                        <option readonly>Select the State</option>
                                        {details.country &&
                                            countries
                                                .find((item) => item.country_name === details.country)
                                                .state.map((state) => (
                                                    <option key={state.state_name} value={state.state_name}>
                                                        {state.state_name}
                                                    </option>
                                                ))}
                                    </select> <br />
                                    {errors.state && <div className='invalid-feedback'>{errors.state}</div>}
                                    <br />

                                    <label htmlFor='city' className='col-md-2 col-12'>City : </label>
                                    <select id='city' className={`border col-md-6 p-2 rounded col-12 ${errors.city && 'is-invalid'}`} onChange={handleChange}>
                                        <option readonly>Select the City</option>
                                        {details.country &&
                                            details.state &&
                                            countries
                                                .find((item) => item.country_name === details.country).state
                                                .find((item) => item.state_name === details.state)?.
                                                city.map((city) => (
                                                    <option key={city.city_name} value={city.city_name}>
                                                        {city.city_name}
                                                    </option>
                                                ))}
                                    </select> <br />
                                    {errors.city && <div className='invalid-feedback'>{errors.city}</div>} <br />

                                    <label htmlFor='hobbies' className='col-lg-2'>Hobbies : </label>
                                    <input type='checkbox' id='Singing' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} />
                                    <label htmlFor='Singing' className='mx-2' > Singing </label>
                                    <input type='checkbox' id='Dancing' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} />
                                    <label htmlFor='Dancing' className='mx-2'> Dancing</label>
                                    <input type='checkbox' id='Drawing' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} />
                                    <label htmlFor='Drawing' className='mx-2'>Drawing</label>
                                    <input type='checkbox' id='Gardening' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} />
                                    <label htmlFor='Gardening' className='mx-2'>Gardening </label>  
                                    <input type='checkbox' id='Reading' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} />
                                    <label htmlFor='Reading' className='mx-2'>Reading </label> 
                                    <input type='checkbox' id='Swimming' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} />
                                    <label htmlFor='Swimming' className='mx-2'>Swimming </label>  <br /> 
                                    {errors.hobbies && <div className='invalid-feedback'>{errors.hobbies}</div>} <br />

                                    <label htmlFor='avatar' className='col-md-2 col-12'>Upload Avatar : </label>
                                    <input type='file' id='avatar' className={`col-md-6 p-2 col-12 ${errors.avatar && 'is-invalid'}`} onChange={handleChange} /> <br />
                                    {errors.avatar && <div className='invalid-feedback'>{errors.avatar}</div>}

                                    <div className='text-center'>
                                        <button type='submit' className={RegistrationStyle.i6 + ' py-2  mt-4 col-lg-2'}>Register</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Registration
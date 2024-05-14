import React, { useState } from 'react'
import RegistrationStyle from '../Registration/RegistrationStyle.module.css'
import Sidebar from './Sidebar'
import ChangePasswordStyle from './ChangePasswordStyle.module.css'
import background3 from './background3.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile, setLogout,setAvatar } from '../../reducers/UserReducer'
import axios from 'axios'

export default function EditProfile() {
    const temp = useSelector(state => state)
    const dispatch = useDispatch()
    const [details, setDetails] = useState({
        firstName: temp.firstName,
        lastName: temp.lastName,
        email: temp.email,
        male: temp.male,
        female: temp.female,
        gender: temp.gender,
        dob: temp.dob,
        phone: temp.phone,
        country: temp.country,
        state: temp.states,
        city: temp.city,
        hobbies: temp.hobbies,
        avatar: temp.avatar,
        courses: temp.courses,
    })
    console.log(details.avatar)
    console.log(details.hobbies)
    let avatar = typeof details.avatar === 'string' ? details.avatar.split('scope')[1] : '';
    //let avatar = details.avatar.split('scope')[1]
    console.log(avatar)
    console.log(details.courses)
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
    if (e.target.id !== 'avatar') {
        if (e.target.id === 'male' || e.target.id === 'female') {
            if (e.target.id === 'male') {
                setDetails({ ...details, gender: 'male' });
            } else if (e.target.id === 'female') {
                setDetails({ ...details, gender: 'female' });
            }
        } else if (e.target.type === 'checkbox') {
            // Handle dynamically checked/unchecked checkboxes
            if (e.target.checked) {
                setDetails({ ...details, hobbies: [...details.hobbies, e.target.id] });
            } else {
                setDetails({ ...details, hobbies: details.hobbies.filter(hobby => hobby !== e.target.id) });
            }
            
        } else if(e.target.id === 'country'){
            setDetails({...details, country : e.target.value,state : '', city : ''})
        } 
        else {
            setDetails({ ...details, [e.target.id]: e.target.value });
        }
    } else {
        setDetails({ ...details, [e.target.id]: e.target.files[0] });
    }
};
    

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const temperror = {}
            let year = new Date(details.dob).getFullYear();
            let currentYear = new Date(Date.now()).getFullYear();
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
        }else if (currentYear - year <18){
            temperror.dob = 'You are below 18 years old'    
        } else if (details.phone === '') {
            temperror.phone = 'Please enter your phone number'
        } else if (details.country === '') {
            temperror.country = 'Please enter your country'
        } else if (details.state === '') {
            temperror.states = 'Please enter your state'
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
            dispatch(setProfile({ firstName: details.firstName, lastName : details.lastName, gender : details.gender, dob: details.dob, email: details.email,phone:details.phone, country:details.country, states: details.state, city : details.city, hobbies: details.hobbies}));
            const formdata = new FormData()
            formdata.append('firstName',details.firstName)
            formdata.append('lastName',details.lastName)
            formdata.append('email',details.email)
            formdata.append('gender',details.gender)
            formdata.append('dob',details.dob)
            formdata.append('phone',details.phone)
            formdata.append('country',details.country)
            formdata.append('state',details.state)
            formdata.append('city',details.city)
            formdata.append('hobbies',details.hobbies)
            formdata.append('avatar',details.avatar)
            axios.post("http://localhost:5000/scope/update", formdata,{
            headers: {
                'Content-Type' : '/application/multipart/form-data'
            }
            }).then(res=>{
                console.log(res.data.message)
                alert(res.data.message)
                //dispatch(setLogout())
                dispatch(setAvatar({avatar:res.data.avatar}))
                navigate('/dashboard')
               
                
            }).catch(err=>{
                console.error(err)
                alert(err.response.data.message)
            })}
        } catch (error) {
            console.error(error)
        }
    }
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
                city: [{ city_name: 'San Francisco' }, { city_name: 'Los Angeles' }, { city_name: 'Fresno' }]
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


    return (
        <div className={RegistrationStyle.i7}>
            <Sidebar />
            <div style={{ backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', paddingBottom: '100%', minHeight: '100vh' }}>
                <div className={ChangePasswordStyle.content}>
                    <div className='container'>
                        <div className={RegistrationStyle.i3}>
                            <div className={RegistrationStyle.i4 + ' col-lg-10 offset-lg-1'}>
                                <p className={RegistrationStyle.i5 + ' text-center pt-3'}>Edit Profile</p>
                                <form className='p-5' onSubmit={handleSubmit}>
                                    <div className='text-center'>
                                        <img src={`http://localhost:5000/public/avatar/${avatar}`} style={{ width: '5cm', height: '5cm' }} /></div>
                                    <br /> <br />
                                    <label htmlFor='firstName' className='col-md-2 col-12'>First name : </label>
                                    <input type='text' id='firstName' placeholder='Enter your first name?' className={`border col-md-6 p-2 rounded col-12 ${errors.firstName && 'is-invalid'}`} onChange={handleChange} value={details.firstName} /> <br />
                                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}  <br />

                                    <label htmlFor='lastName' className='col-md-2 col-12 '>Last name : </label>
                                    <input type='text' id='lastName' placeholder='Enter your last name?' className={`border col-md-6 p-2 rounded col-12 ${errors.lastName && 'is-invalid'}`} onChange={handleChange} value={details.lastName} /> <br /> <br />
                                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

                                    <label htmlFor='email' className='col-md-2 col-12 '>Email : </label>
                                    <input type='text' id='email' placeholder='Enter your Email id?' className={`border col-md-6 p-2 rounded col-12 ${errors.email && 'is-invalid'}`} disabled value={details.email} /> <br /> <br />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                                    <label htmlFor='gender' className='col-md-2'>Gender : </label>
                                    <input type='radio' id='male' name='gender' onChange={handleChange} className={`${errors.gender && 'is-invalid'}`} checked={details.gender === 'male'} />
                                    <label htmlFor='male' className='px-4' >Male</label> &nbsp;
                                    <input type='radio' id='female' name='gender' onChange={handleChange} className={`${errors.gender && 'is-invalid'}`} checked={details.gender === 'female'} />
                                    <label htmlFor='female' className='px-4'>Female</label> <br />
                                    {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>} <br />

                                    <label htmlFor='dob' className='col-md-2 col-12' >Date of birth : </label>
                                    <input type='date' id='dob' placeholder='Enter your date-of-birth' className={`border col-md-6 p-2 rounded col-12 ${errors.dob && 'is-invalid'}`} onChange={handleChange} value={details.dob} /> <br />
                                    {errors.dob && <div className='invalid-feedback'>{errors.dob}</div>} <br />

                                    <label htmlFor='phone' className='col-md-2 col-12'>Contact Number : </label>
                                    <input type='tel' id='phone' placeholder='Enter your contact number' className={`border col-md-6 p-2 rounded col-12 ${errors.phone && 'is-invalid'}`} onChange={handleChange} value={details.phone} /> <br />
                                    {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>} <br />

                                    <label htmlFor='country' className='col-md-2 col-12'>Country : </label>
                                    <select id='country' className={`border col-md-6 p-2 rounded col-12 ${errors.country && 'is-invalid'}`} onChange={handleChange} value={details.country}>
                                        <option disabled select>Select Country</option>
                                        {countries.map(item => (
                                            <option value={item.country_name} key={item.country_name} name={item.country_name}>{item.country_name}</option>
                                        )
                                        )}
                                    </select> <br />
                                    {errors.country && <div className='invalid-feedback'>{errors.country}</div>} <br />

                                    <label htmlFor='state' className='col-md-2 col-12' >State : </label>
                                    <select id='state' className={`border col-md-6 p-2 rounded col-12 ${errors.states && 'is-invalid'}`} onChange={handleChange} value={details.state}>
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
                                    {errors.states && <div className='invalid-feedback'>{errors.states}</div>}
                                    <br />

                                    <label htmlFor='city' className='col-md-2 col-12'>City : </label>
                                    <select id='city' className={`border col-md-6 p-2 rounded col-12 ${errors.city && 'is-invalid'}`} onChange={handleChange} value={details.city}>
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

                                    <label htmlFor='hobbies' className='col-md-2'>Hobbies : </label>
                                    {console.log('Should Singing be checked?', details.hobbies.includes('Singing'))}
                                    <input type='checkbox' id='Singing' className={`${errors.hobbies && 'is-invalid'}`} checked={details.hobbies.includes('Singing')} onChange={handleChange} value='Singing'  />
                                    <label htmlFor='Singing' className='mx-2' > Singing </label>
                                    <input type='checkbox' id='Dancing' className={`${errors.hobbies && 'is-invalid'}`} checked={details.hobbies.includes('Dancing')} onChange={handleChange}value='Dancing' />
                                    <label htmlFor='Dancing' className='mx-2'> Dancing</label>
                                    <input type='checkbox' id='Drawing' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} checked={details.hobbies.some(hobby => hobby ==='Drawing')} value ='Drawing'/>
                                    <label htmlFor='Drawing' className='mx-2'>Drawing</label>
                                    <input type='checkbox' id='Gardening' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} checked={details.hobbies.some(hobby => hobby ==='Gardening')} value ='Gardening' />
                                    <label htmlFor='Gardening' className='mx-2'>Gardening </label>
                                    <input type='checkbox' id='Reading' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} checked={details.hobbies.some(hobby => hobby ==='Reading')} />
                                    <label htmlFor='Reading' className='mx-2'>Reading </label>
                                    <input type='checkbox' id='Swimming' className={`${errors.hobbies && 'is-invalid'}`} onChange={handleChange} checked={details.hobbies.some(hobby => hobby ==='Swimming')} />
                                    <label htmlFor='Swimming' className='mx-2'>Swimming </label>  <br />
                                    {/* <label htmlFor='others' className='offset-md-2 col-12 col-md-1'>Others </label>
                                    <input type='text' className={`border col-md-5 p-2 rounded col-12 ${errors.hobbies && 'is-invalid'}`} id='others' onChange={handleChange} value={details.hobbies.filter((hobby) => !excludedHobbies.includes(hobby))} />   <br /> */}
                                    {errors.hobbies && <div className='invalid-feedback'>{errors.hobbies}</div>} <br />

                                    <label htmlFor='avatar' className='col-md-2 col-12'>Upload Avatar : </label>
                                    <input type='file' id='avatar' className={`col-md-6 p-2 col-12 ${errors.avatar && 'is-invalid'}`} onChange={handleChange} /> <br />
                                    {errors.avatar && <div className='invalid-feedback'>{errors.avatar}</div>}
                                    <label htmlFor='courses' className='col-12 col-md-1'>Courses: </label>
                                    {details.courses.length > 0 ? (
                                        details.courses.map((course, index) => (
                                            <span key={index}>
                                                <li className = 'offset-md-2 pb-1 pt-0'>{course.S1}</li>
                                            </span>
                                        ))
                                    )
                                        :
                                        <div style={{ display: 'inline' }} className={'offset-md-1 col-md-5 col-12'}>Not Enrolled</div>}
                                    
                                    <div className='text-center'>
                                        <button type='submit' className={RegistrationStyle.i6 + ' p-1 mt-4 col-lg-2'}>Update</button>
                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}
// const handleChange = (e) => {
//     if (e.target.id !== 'avatar') {
//         if (e.target.id === 'male' || e.target.id === 'female') {
//             if (e.target.id === 'male') {
//                 setDetails({ ...details, gender: 'male' });
//             } else if (e.target.id === 'female') {
//                 setDetails({ ...details, gender: 'female' });
//             }
//         } else if (e.target.id === 'others') {
//             setDetails({ ...details, hobbies: [...details.hobbies.filter(hobby => !excludedHobbies.includes(hobby)), e.target.value] });
//         } else if (e.target.type === 'checkbox' && e.target.id !== 'others') {
//             // Handle dynamically checked/unchecked checkboxes
//             if (e.target.checked) {
//                 setDetails({ ...details, hobbies: [...details.hobbies, e.target.id] });
//             } else {
//                 setDetails({ ...details, hobbies: details.hobbies.filter(hobby => hobby !== e.target.id) });
//             }
//         } else {
//             setDetails({ ...details, [e.target.id]: e.target.value });
//         }
//     } else {
//         setDetails({ ...details, [e.target.id]: e.target.files[0] });
//     }
// };

    // const handleChange = (e) => {
    //     if (e.target.id !== 'avatar') {
    //         if (e.target.id === 'male' || e.target.id === 'female') {
    //             if (e.target.id === 'male') {
    //                 setDetails({ ...details, gender: 'male' });
    //             } else if (e.target.id === 'female') {
    //                 setDetails({ ...details, gender: 'female' });
    //             }
    //         } else if (e.target.id ==='Singing' || e.target.id === 'Dancing' || e.target.id === 'Drawing' || e.target.id === 'Gardening') {
    //             setDetails({ ...details, hobbies: [...details.hobbies, e.target.id] });
    //         } else if (e.target.id === 'others') {
    //             setDetails({ ...details, hobbies: [...details.hobbies, e.target.value] })
    //         } else {
    //             setDetails({ ...details, [e.target.id]: e.target.value })
    //         }
    //     } else {
    //         setDetails({ ...details, [e.target.id]: e.target.files[0] })
    //     }
    // }
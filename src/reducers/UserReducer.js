import {createSlice} from '@reduxjs/toolkit'

export const UserSlicer = createSlice({
    name: 'user',
    initialState: {
        firstName : '',
        lastName: '',
        password:'',
        gender:'',
        phone: '',
        country:'',
        states: '',
        city: '',
        hobbies: '',
        dob : '',
        email : '',
        avatar : '',
        token : '',
        courses: [],
        isFirstTime : true,
    },
    reducers: {
        setRegistration: (state, action) => {
            const { firstName, lastName, gender, phone, country, states, city,hobbies, dob, email} = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.gender = gender;
            state.dob = dob
            state.email = email
            state.phone = phone
            state.country = country
            state.states = states
            state.city = city
            state.hobbies = hobbies
            state.isFirstTime = true

        },
        setLogin: (state, action) => {
            state.token = action.payload.token
            state.avatar = action.payload.avatar
            state.password = action.payload.password
            state.isFirstTime = action.payload.isFirstTime
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.phone = action.payload.phone
            state.country = action.payload.country
            state.states = action.payload.states
            state.city = action.payload.city
            state.dob = action.payload.dob
            state.hobbies = action.payload.hobbies
            console.log(state.hobbies)
            console.log(state.email)
            console.log(state.avatar)
            console.log(state.password)
            console.log(state.isFirstTime)
        },
        setProfile: (state, action) => {
            const { firstName, lastName, gender, phone, country, states, city,hobbies, dob, email} = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.gender = gender;
            state.dob = dob
            state.email = email
            state.phone = phone
            state.country = country
            state.states = states
            state.city = city
            state.hobbies = hobbies
        },
        setCourses: (state,action)=>{
            state.courses = action.payload.courses
        },
        setAvatar:(state,action)=>{
            state.avatar = action.payload.avatar
        },
        setLogout : (state, action) => {
            // state.firstName =''
            // state.dob = ''
            // state.email = ''
            // state.avatar = null
            state.token =''
           
        }
    }
})

export const {setRegistration, setLogin, setCourses, setLogout, setProfile,setAvatar} = UserSlicer.actions;

export default UserSlicer.reducer;
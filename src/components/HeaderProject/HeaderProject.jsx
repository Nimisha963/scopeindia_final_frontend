import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import HeaderProjectStyle from './HeaderProject.module.css'
import LogoBird from './LogoBird.png'
import { Link, Route, Routes } from 'react-router-dom'
import AboutUs from '../AboutUs/AboutUs'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../reducers/UserReducer'
import axios from 'axios'




function HeaderProject() {
  const firstName = useSelector(state => state.firstName)
  console.log(firstName)
  let avatar = useSelector(state => state.avatar)
  avatar = typeof avatar === 'string' ? avatar.split('scope')[1] : '';
  //avatar = avatar.split('scope')[1]
  console.log(avatar)
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()
  
  const handleLogout =()=>{
    dispatch(setLogout())
    try {
      axios.post('http://localhost:5000/scope/logout'
    ).then(res=>{
      alert(res.data.message)
    }).catch(err=>{
      alert(err.res.data.message)
    })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container'>
      <div className={HeaderProjectStyle.a1}>
        <nav className='navbar navbar-expand-lg'>
          <div className='container-fluid'>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <div>
                <ul className='navbar-nav'>
                  <li className={HeaderProjectStyle.a5 + ' nav-item  px-lg-5'}>
                    <Link className={HeaderProjectStyle.a2 + ' nav-link'} aria-current='page' to='/'>Home</Link>
                  </li>
                  <li className={HeaderProjectStyle.a5 + ' nav-item  px-lg-2'}>
                    <Link to='/about' className={HeaderProjectStyle.a2 + ' nav-link'}>About Us</Link>
                  </li>
                  <li className={HeaderProjectStyle.a5 + ' nav-item px-lg-5'}>
                    <Link to='/courseshome' className={HeaderProjectStyle.a2 + ' nav-link'}>Courses</Link>
                  </li>
                  <img className='navbar-brand px-2' src={LogoBird} alt="LogoBird" style={{ width: "40px" }} />
                  <li className={HeaderProjectStyle.a5 + ' nav-item px-lg-5'}>
                    <Link to='/contact' className={HeaderProjectStyle.a2 + ' nav-link'}>Contact Us</Link>
                  </li>
                    {token ?
                      <>
                        <Link to ='/dashboard' className = {HeaderProjectStyle.a4} style ={{color : 'white',fontweight: 'bold', textDecoration:'none'}}>My dashboard</Link>
                        &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                        <img src={`http://localhost:5000/public/avatar/${avatar}`} style={{ width: "40px", height: '40px', borderRadius: '40px' }} />
                        <span style ={{color:'rgb(255, 200, 0)'}}> &nbsp; Hey {firstName} <br/> &nbsp;
                        <Link to='/login' className = {HeaderProjectStyle.a4} style ={{fontSize : '14px', color : 'white', fontStyle: 'italic'}} onClick ={handleLogout}>Log out</Link></span>
                      </>

                      :
                      <>
                      <li className={HeaderProjectStyle.a5 + ' text-center nav-item px-lg-2'}>
                        <Link to='/register' className={HeaderProjectStyle.a3 + ' nav-link'}>Register</Link>
                      </li>
                        <li className={HeaderProjectStyle.a5 + ' text-center nav-item px-lg-2'}>
                          <Link to='/login' className={HeaderProjectStyle.a3 + ' nav-link'}>Login</Link>
                        </li>

                      </> 
                  }

                  {/* <li className='nav-item'> 
                <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type = 'button' data-bs-toggle = 'dropdown' aria-expanded='false'>
                  {user.username}</button>
                <ul className='dropdown-menu'>
                  <li><Link className ='dropdown-item' to = {user.isAdmin ? '/admindashboard' : '/dashboard'}>Dashboard</Link></li>
                  <li><button className='dropdown-item' onClick ={handleLogout}>Logout</button></li>
                  </ul> 
                  </div>
            </li> */}

                </ul>
              </div>
            </div>
          </div>
        </nav>

      </div>
    </div>



  )
}

export default HeaderProject
import logo from './logo.svg';
import './App.css';
import HeaderProject from './components/HeaderProject/HeaderProject';
import Section from './components/Section/Section';
import CallSection from './components/CallSection/CallSection';
import Section1 from './components/Section1/Section1';
import AnimationSection from './components/AnimationSection/AnimationSection';
import FooterProject from './components/FooterProject/FooterProject';
import {Navigate, Route, Routes} from 'react-router-dom'

import AboveFooter from './components/FooterProject/AboveFooter';
import MainHome from './components/MainHome/MainHome';
import ContactUs from './components/ContactUs/ContactUs';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import AboutUs from './components/AboutUs/AboutUs';
import Dashboard from './components/Login/Dashboard';
import EditProfile from './components/Login/EditProfile';
import ChangePassword from './components/Login/ChangePassword';
import Courses from './components/Login/Courses';
import Courseshome from './components/Courseshome/Courseshome';
import ForgotPassword from './components/Forgotpassword/ForgotPassword';
import LoginFirst from './components/Login/LoginFirst';
import ChangePasswordFirst from './components/Login/ChangePasswordFirst';
import { useSelector } from 'react-redux';
import ScrollToTop from './components/ScrollToTop';



function App() {

  const token = useSelector(state=>state.token)
  return (
    <div className="App">
      <HeaderProject />
      <ScrollToTop />
       <Routes>
        
        <Route path='/' element={<MainHome />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element= {<ContactUs />} />
        <Route path='/register' element= {<Registration />} />
        <Route path='/loginfirst' element ={token ? <Navigate to ={'/login'}/> : <LoginFirst/>} /> 
        {/* <Route path='/loginfirst' element ={<LoginFirst/> } />  */}
        <Route path='/login' element ={token ?  <Navigate to ={'/dashboard'}/> : <Login/>} /> 
        <Route path='/dashboard' element ={token ? <Dashboard /> : <Navigate to ={'/login'}/>} />
        <Route path='/editprofile' element={token ? <EditProfile/> : <Navigate to ={'/login'}/>} />
        <Route path='/changepassword' element={token ? <ChangePassword /> : <Navigate to ={'/login'}/>} />
        <Route path='/changepasswordfirst' element={token ? <Navigate to ={'/changepassword'}/> : <ChangePasswordFirst /> } />
        {/* <Route path='/changepasswordfirst' element={<ChangePasswordFirst />} /> */}
        <Route path='/courses' element={token ? <Courses/> : <Navigate to ={'/login'}/>} />
        <Route path='/courseshome' element={<Courseshome/>} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        
      </Routes>
      <FooterProject />  
       {/*<HeaderProject />
        <Section />
        <CallSection />
        <Section1 />
        <AnimationSection />
        <AboveFooter />
        <FooterProject />  
  <AboutUs /> */}
         
    </div>
  );
}

export default App;

import React from 'react'
import background from '../background.jpg'
import { Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import AboutUsStyle from './AboutUs.module.css'
import HeaderProject from '../HeaderProject/HeaderProject'
import FooterProject from '../FooterProject/FooterProject'
import AboveFooter from '../FooterProject/AboveFooter'
import NumbersSecton from '../Students30+Trained/NumbersSecton'
import background3 from '../Login/background3.jpg'


function AboutUs() {

  return (
    <>
      <div style={{ backgroundImage: `url(${background3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '50px' }}>
      <div className={AboutUsStyle.g3 + ' offset-lg-2 col-lg-8'}>
        <div className='container mt-5 p-5'>
          <p className= {AboutUsStyle.g4 + ' text-center h1 mb-5'}>About Us</p>
          <div className={AboutUsStyle.g1}>
            <p>One of the best Training Destination for Software, Networking and Cloud Computing courses in India
              Software, Networking, and Cloud Professional Education Centre in Kerala from Suffix E Solutions with WORKING
              PROFESSIONALS oriented on-the-job TRAINING model. SCOPE INDIA provides courses for Software Programming in Python
              (Data Science | Artificial Intelligence | Machine Learning | Deep Learning, Data Analytics),
              Java, PHP, .Net, Software Testing Manual and Automation, Cloud Computing (AWS | Azure), Server
              Administration (MCSE | RHCE), Networking (CCNA), Mobile App Development in Flutter, and Digital Marketing.
              Training with 100% Trusted Job Based Internship Model. SCOPE INDIA has a Strong Placement Cell that provides
              jobs to thousands of students every year. We assure you, you won't regret it after training from SCOPE INDIA!  </p>

            <p>This is how SCOPE INDIA can support both newbies and experienced in the industry to upgrade their skills. </p>
          </div>
          <div className='text-center'>
            <Link to='/contact' className={AboutUsStyle.g2 + ' col-6 offset-3 mt-5 mb-2 p-2'}>Contact Us</Link>
            <Link to='/courseshome' className={AboutUsStyle.g2 + ' col-6 offset-3 mb-2 p-2'} >Courses</Link>
            <Link to='/register' className={AboutUsStyle.g2 + ' col-6 offset-3 mb-2 p-2'}>Register Now</Link>
          </div>
        </div>
        <NumbersSecton />
      </div>
    </div>
    </>
  )
}

export default AboutUs 
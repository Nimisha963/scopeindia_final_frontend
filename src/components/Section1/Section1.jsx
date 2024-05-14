import React from 'react'
import rating from './Rating.png'
import {Routes, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Section1Style from './Section1.module.css'


function Section1() {
  return (
    <div>
      <div className='text-center container'>
        <img src={rating} alt='rating' />
        <section>
          <p className={Section1Style.d1}> SCOPE INDIA, your career partner! </p>
          <p className={Section1Style.d2}> One of the best Training Destination for Software, Networking and Cloud Computing courses in India </p>
          <p className={Section1Style.d3}> Software, Networking, and Cloud Professional Education Centre in Kerala from Suffix E Solutions with
            WORKING PROFESSIONALS oriented on-the-job TRAINING model. SCOPE INDIA provides courses for Software
            Programming in Python (Data Science | Artificial Intelligence | Machine Learning | Deep Learning, Data Analytics),
            Java, PHP, .Net, Software Testing Manual and Automation, Cloud Computing (AWS | Azure), Server Administration (MCSE | RHCE),
            Networking (CCNA), Mobile App Development in Flutter, and Digital Marketing. Training with 100% Trusted Job Based Internship
            Model. SCOPE INDIA has a Strong Placement Cell that provides jobs to thousands of students every year. We assure you, you won't
            regret it after training from SCOPE INDIA!   </p>

          <p className={Section1Style.d4}>This is how SCOPE INDIA can support both newbies and experienced in the industry to upgrade their skills. </p>

          <div>
              <Link to = '/about' className={Section1Style.d5} style = {{backgroundColor:"#7c62bd"}} > About Us </Link>
              <Link to = '/courses' className={Section1Style.d6} style = {{backgroundColor: "#62bdb4"}} >Courses </Link>
              <Link to = '/contact' className={Section1Style.d7} > Contact Us </Link>
              <Link to = '/register' className={Section1Style.d7} > Register Now ! </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Section1
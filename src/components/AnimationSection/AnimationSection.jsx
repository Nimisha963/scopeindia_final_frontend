import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import training from './training.png'
import internship from './internship.png'
import grooming from './grooming.png'
import placement from './placement.png'
import {Routes, Route, Link} from 'react-router-dom'
import AnimationStyle from './AnimationSection.module.css'

function AnimationSection() {
  return (
    <div style ={{backgroundColor : "#f8f5f5"}}>
    <div className ='container' >
        <div className='row justify-content-center'>
            <div className= {AnimationStyle.e1 + ' col-xl-2 my-5'} /*style ={{marginLeft :'100px'}}*/>
            <Link to='/courses' className = {AnimationStyle.e2}>
            <img src ={training} alt = 'training'/>
            <p className= {AnimationStyle.e3 + ' my-4'}>Training</p>
            <p className= {AnimationStyle.e4}>You are trained under Suffix E Solutions working professionals, on-the-job training model.</p>
            </Link>
            </div>

            <div className= {AnimationStyle.e1 + ' col-xl-2 col-sm-6 mx-4 my-5'}>   
            <Link to='/courses' className = {AnimationStyle.e2}>
            <img src ={internship} alt = 'internship'/>
            <p className= {AnimationStyle.e3 + ' my-4'} /*style ={{marginTop :'58px'}}*/ >Internship</p>
            <p className= {AnimationStyle.e4}>After course completion, you will be proceeded to live projects with a 6 months experience certificate.</p>
            </Link>
            </div>
            
            <div className= {AnimationStyle.e1 + ' col-xl-2 col-sm-6 mx-4 my-5'}>   
            <Link to='/courses' className = {AnimationStyle.e2}>
            <img src ={grooming} alt = 'grooming' />
            <p className= {AnimationStyle.e3 + ' my-4'}>Grooming</p>
            <p className= {AnimationStyle.e4}>CV Preparation, Interview Preparation, and Personality Development.</p>
            </Link>
            </div>

            <div className= {AnimationStyle.e1 + ' col-xl-2 col-sm-6 mx-4 my-5'}>   
            <Link to='/courses' className = {AnimationStyle.e2}>
            <img src ={placement} alt = 'placement' />
            <p className= {AnimationStyle.e3 + ' my-4'}>Placement</p>
            <p className= {AnimationStyle.e4}>Gives 100% FREE placement support to all our fellow techies through SCOPE INDIA's Placement Cell.</p>
            </Link>
            </div>

        
        </div>
    </div>
    </div>
  )
}

export default AnimationSection
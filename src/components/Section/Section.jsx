import React from 'react'
import { Link } from 'react-router-dom'
import SectionStyle from './Section.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import scopelogo from './scopelogo.png'
import course1 from './course1.png'
import course2 from './course2.png'
import course3 from './course3.png'
import course4 from './course4.png'
import course5 from './course5.png'
import background from './background.jpg'

function Section() {
    return (
        <div style ={{backgroundImage : `url(${background})`}} >
        <div className={SectionStyle.b1} >
            <div className ='text-center'> 
            <img className={SectionStyle.b2 + ' col-sm-2 col-md-5 img-fluid'} src={scopelogo} alt='Scope Logo'/>
            </div>
            <div className={SectionStyle.b3 + ' mt-5'}>
                <div className='carousel slide w-50 mx-auto' data-bs-ride='carousel' id='coursecarousel' >
                    <div className='carousel-inner'>
                        <div className='carousel-item active'>
                            <img src={course4} alt="Course 4" className='d-block img-fluid' />
                        </div>
                        <div className='carousel-item'>
                            <img src={course2} alt="Course 2" className='d-block img-fluid' />
                        </div>
                        <div className='carousel-item'>
                            <img src={course3} alt="Course 3" className='d-block img-fluid' />
                        </div>
                        <div className='carousel-item'>
                            <img src={course1} alt="Course 1" className='d-block img-fluid' />
                        </div>
                        <div className='carousel-item'>
                            <img src={course5} alt="Course 5" className='d-block img-fluid' />
                        </div> 
                    </div>
                    <button className='carousel-control-prev' type='button' data-bs-target='#coursecarousel' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon'></span>
                    </button>
                    <button className='carousel-control-next' type='button' data-bs-target='#coursecarousel' data-bs-slide='next'>
                        <span className='carousel-control-next-icon'></span>
                    </button>

                </div>
            </div>

        </div>
        </div>
    )
}

export default Section
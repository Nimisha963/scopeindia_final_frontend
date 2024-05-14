import React from 'react'
import NumbersStyle from './NumbersSection.module.css'

function NumbersSecton() {
    return (
        <div>
            <div className='p-1'>
            <div className='container mt-4' >
                <div className = 'offset-3'>
                <div className='row'>
                    <div className='col-lg-3 g-lg-4'>
                   <p className= {NumbersStyle.h1}> 1000+</p> 
                    <p className= {NumbersStyle.h2 }>STUDENTS ARE 
                    TRAINED EVERY YEAR  </p>
                    </div>
                    <div className='col-lg-3 g-lg-5'>
                   <p className= {NumbersStyle.h1 + ' mt-lg-5'}> 30+</p> 
                    <p className= {NumbersStyle.h2}>COMPUTER COURSES  </p>
                    </div>
                    <div className='col-lg-4 g-lg-4'>
                   <p className= {NumbersStyle.h1}> 95%</p> 
                    <p className= {NumbersStyle.h2}>STUDENTS ARE GETTING 
                    PLACED EVERY YEAR  </p>
                    </div>
                    </div>   
      </div>
        </div>
        </div>
        </div>
      )
    }

export default NumbersSecton
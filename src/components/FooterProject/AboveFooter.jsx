import React from 'react'
import AboveFooterStyle from './AboveFooter.module.css'

function AboveFooter() {
  return (
    <div>
        <div className='mt-5 p-5' style={{backgroundColor : '#040a5c'}}>
        <div className='container text-center' >
            <div className='row'>
                <div className='col-md-4 mt-5'>
               <p className= {AboveFooterStyle.f1}> 1000+</p> 
                <p className= {AboveFooterStyle.f2}>STUDENTS ARE 
                TRAINED EVERY YEAR  </p>
                </div>
                <div className='col-md-4'>
               <p className= {AboveFooterStyle.f1}> 30+</p> 
                <p className= {AboveFooterStyle.f2}>COMPUTER COURSES  </p>
                </div>
                <div className='col-md-4 mt-5'>
               <p className= {AboveFooterStyle.f1}> 95%</p> 
                <p className= {AboveFooterStyle.f2}>STUDENTS ARE GETTING 
                PLACED EVERY YEAR  </p>
                </div>
  </div>
    </div>
    </div>
    </div>
  )
}

export default AboveFooter
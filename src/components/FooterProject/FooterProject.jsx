import React from 'react'
import {Link} from 'react-router-dom'
import FooterProjectStyle from './FooterProject.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import scopelogo from './scopelogo.png'
import iso from './iso3.png'
import iaf from './iaf.png'
import ias from './ias.jpg'

function FooterProject() {
  return (
    <div className= { FooterProjectStyle.f6 + ' p-5'} style={{backgroundColor : '#040a5c'}}>
        <div className='container text-center'>
           {/*} <div className='row'>
                <div className='col-md-4 mt-5'>
               <p className= {FooterProjectStyle.f1}> 1000+</p> 
                <p className= {FooterProjectStyle.f2}>STUDENTS ARE 
                TRAINED EVERY YEAR  </p>
                </div>
                <div className='col-md-4'>
               <p className= {FooterProjectStyle.f1}> 30+</p> 
                <p className= {FooterProjectStyle.f2}>COMPUTER COURSES  </p>
                </div>
                <div className='col-md-4 mt-5'>
               <p className= {FooterProjectStyle.f1}> 95%</p> 
                <p className= {FooterProjectStyle.f2}>STUDENTS ARE GETTING 
                PLACED EVERY YEAR  </p>
                </div>
  </div> */}
            <div>
                <img src = {scopelogo} alt ='Scopelogo' className='mt-2 p-5 d-block mx-auto img-fluid'/>
                <div className= {FooterProjectStyle.f3}>
                <img src = {iso} alt ='iso' className=' mx-2 img-fluid'/>
                <img src = {iaf} alt ='iaf' className='mx-2 img-fluid' />
                <img src = {ias} alt ='ias' className='mx-2 img-fluid' />
                </div>
                <p className= {FooterProjectStyle.f4 + ' mt-3'}>An ISO 9001:2015 Certified Company</p>
                <p className= {FooterProjectStyle.f4}>All Rights Reserved Suffix E Solutions © 2007- {new Date().getFullYear()}</p>
            </div>
            <div className='row mt-5'>
                <Link to= 'tel: 9745936073' className= {FooterProjectStyle.f5 + ' col-md-2 mx-lg-5 mx-3'}>9745936073 <br/>(TPK)</Link>
                <Link to= 'tel: 9745936073' className= {FooterProjectStyle.f5 + ' col-md-2 mx-3'}>9745936073 <br/>(TVM)</Link>
                <Link to= 'tel: 9745936073' className= {FooterProjectStyle.f5 + ' col-md-2 mx-3'}>7592939481 <br/>(EKM)</Link>
                <Link to= 'tel: 9745936073' className= {FooterProjectStyle.f5 + ' col-md-2 mx-3'}>8075536185<br/>(NGL)</Link>
                <Link to = 'mailto: info@scopeindia.org' className= {FooterProjectStyle.f5 + ' col-md-2'}>info@scopeindia.org</Link>
            </div>
        </div>
    </div>
  )
}

export default FooterProject
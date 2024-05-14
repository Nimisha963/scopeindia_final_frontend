import React from 'react'
import CallSectionStyle from './CallSection.module.css'
import Callme from './call.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

function CallSection() {
    return (
        <>
            <div style={{ backgroundColor: '#f9f9f9 ' }}>
                <div className={CallSectionStyle.c1 + ' row col-lg-9 mx-auto'}>
                    <div className={CallSectionStyle.c2 + ' col-md-6'}>
                        <img src={Callme} alt='Call Me' className='w-100' />
                    </div>
                    <div className={CallSectionStyle.c3 + ' col-md-6 w-50'}>
                        <h2>SCOPE INDIA  <br />
                            is open 365 days a year </h2>
                        <p>We are open 7 days 24 hrs to talk to you and <br />listen to your queries.</p>
                        <h3>GET A FREE CALL BACK </h3> <br />
                        <input type="text" placeholder='Enter your name' readOnly className='mb-3 w-100' /> <br />
                        <input type="text" placeholder='Enter your phone no.' readOnly className='mb-3 w-100' /> <br />
                        <button type='button' className={CallSectionStyle.c4 + ' mb-3 w-100'}>Call Me</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallSection
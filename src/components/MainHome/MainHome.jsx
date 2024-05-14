import React from 'react'
import HeaderProject from '../HeaderProject/HeaderProject'
import Section from '../Section/Section'
import CallSection from '../CallSection/CallSection'
import Section1 from '../Section1/Section1'
import AnimationSection from '../AnimationSection/AnimationSection'
import FooterProject from '../FooterProject/FooterProject'
import AboveFooter from '../FooterProject/AboveFooter'

function MainHome() {
  return (
    <div>
        <Section />
        <CallSection />
        <Section1 />
        <AnimationSection />
        <AboveFooter />
    </div>
  )
}

export default MainHome
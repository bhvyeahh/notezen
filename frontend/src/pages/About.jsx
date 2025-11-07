import React from 'react'
import About_Banner from '../components/About_Banner'
import Core_Feature from '../components/Core_Feature'
import Footer from '../components/Footer'
import About_Data from '../components/About_Data'
import About_built from '../components/About_built'
import ProgressBullets from '../components/About_Madefor'

const About = () => {
  return (
    <div>
      <About_Banner/>
      <Core_Feature/>
      <About_built/>
      <ProgressBullets/>
      <About_Data/>
      <Footer/>
    </div>
  )
}

export default About

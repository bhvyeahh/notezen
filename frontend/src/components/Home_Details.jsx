import React from 'react'
import '../styles/Home-Details.css'
import Cards from './Card'
import Section from './Section'
import BentoGrid from './BentoGrid'
import Cta from './Cta'

const Home_Details = () => {
  return (
    <>
    <div className='home-details'>
        <Section>
        <div className="home-intro">
            <h1>Welcome to Notezen</h1>
            <span>Your personalized learning and growing app.</span>
        </div>
        </Section>
        <div className='home-cards'>
        <Cards/>
        </div>
        <Section>
        <BentoGrid/>
        </Section>
        <Section>
          <Cta/>
        </Section>
        
    </div>
    </>
  )
}

export default Home_Details

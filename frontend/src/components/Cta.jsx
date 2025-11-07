import React from 'react'
import '../styles/Cta.css'

const Cta = () => {
  return (
    <div className='cta-container'>
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className='cta-video'
      >
        <source src="/cta-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="cta-overlay">
        <h2>Start Your Journey Now</h2>
        <p>Sign up and explore the future.</p>
        <button className="cta-button">
          <a href="/signup">Sign Up</a>
</button>
      </div>
    </div>
  )
}

export default Cta


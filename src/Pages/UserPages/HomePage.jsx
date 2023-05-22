import React from 'react'
import Navbar from '../../Components/UserComponents/Home/Navbar'
import Hero from '../../Components/UserComponents/Home/Hero'
import Services from '../../Components/UserComponents/Home/Services'
import Testimonials from '../../Components/UserComponents/Home/Testimonials'
import Footer from '../../Components/UserComponents/Home/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
     <Hero/>
     <Services/>
     <Testimonials/>
     <Footer/>
    </div>
  )
}

export default HomePage

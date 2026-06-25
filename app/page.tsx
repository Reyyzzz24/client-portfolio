import React from 'react'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'
import About from './sections/About'
import Services from './sections/Services'
import Process from './sections/Process'
import Work from './sections/Works'
import Stat from './sections/Stat'
import Testimonials from './sections/Testimonials'
import Insights from './sections/Insights'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Work />
      <Stat />
      <Testimonials />
      <Insights />
      <Contact />
      <Footer />
    </>
  )
}

export default Home

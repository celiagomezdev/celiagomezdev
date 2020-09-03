import React from "react"
import Hero from "../components/hero"
import CeliaAnimation from "../components/celia-animation"
import MiddleSection from "../components/middle-section"
import Contact from "../components/contact"

export default function HomePage() {
  return (
    <main id="home-page">
      <Hero />     
      <CeliaAnimation />
      <MiddleSection />
      <Contact />
    </main>
  )
}

import React from "react"
import Hero from "../components/hero"
import MiddleSection from "../components/middle-section"
import Contact from "../components/contact"

export default function HomePage() {
  return (
    <main id="home-page">
      <Hero />
      <MiddleSection />
      <Contact />
    </main>
  )
}

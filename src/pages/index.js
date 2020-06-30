import React from "react"
import About from "../components/about"
import Projects from "../components/projects"
import Skills from "../components/skills"
import Inspiration from "../components/inspiration"

export default function HomePage() {
  return (
    <main id="home-page">
      <About />
      <Projects />
      <Skills />
      <Inspiration />
    </main>
  )
}

import React from "react"
import NavBar from "../components/nav-bar"
import About from "../components/about"
import "../assets/style/main.scss"

export default function Home() {
  return (
    <main>
      <NavBar />
      <About />
    </main>
  )
}

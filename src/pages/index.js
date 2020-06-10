import React from "react"
import About from "../components/about"
import "../assets/style/main.scss"

export default function Home() {
<<<<<<< HEAD
  return pug`
    .div
      .grid.main
        About
  `
=======
  return (
    <div>
      <div className="grid main">
        <About />
      </div>
    </div>
  )
>>>>>>> style: update global styles
}

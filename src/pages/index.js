import React from "react"
import About from "../components/about"
import "../assets/style/main.scss"

export default function Home() {
  return (
    <div>
      <div className="grid main">
        <About />
      </div>
    </div>
  )
}

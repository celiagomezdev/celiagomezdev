import React from "react"
import NavBar from "../components/nav-bar"
import Footer from "../components/footer"
import "../assets/style/main.scss"

export default function Layout({ children }) {
  return (
    <div id="layout">
      <NavBar />
      { children }
      <Footer />
    </div>
  )
}

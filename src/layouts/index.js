import React from "react"
import NavBar from "../components/nav-bar"
import Footer from "../components/footer"
import "../assets/style/main.scss"
import { Store } from "../context"

export default function Layout({ children }) {
  return (
    <div id="layout">
      <Store>
        <NavBar />
        {children}
        <Footer />
      </Store>
    </div>
  )
}

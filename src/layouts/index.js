import React from "react"
import NavBar from "../components/nav-bar"
import "../assets/style/main.scss"

export default function Layout({ children }) {
  return (
    <div id="layout">
      <NavBar />
      { children }
    </div>
  )
}

import React from "react"
import "../assets/style/main.scss"
import { Link } from "gatsby"

export default function NotFoundPage() {
  return (
    <div className="content">
      <p>404  - Page not found. Please try again.</p>
      <div><Link style={{ textDecoration : "none", color: "inherit", fontWeight: "bold" }} to="/">Go to Homepage</Link></div>
    </div>
  )
}

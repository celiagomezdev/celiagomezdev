import React from "react"
import { Link } from "gatsby"

export default function NotFoundPage() {
  return (
    <main id="not-found-page">
      <p>404  - Page not found. Please try again.</p>
      <div><Link style={{ textDecoration : "none", color: "inherit", fontWeight: "bold" }} to="/">Go to Homepage</Link></div>
    </main>
  )
}

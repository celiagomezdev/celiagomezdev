import React from "react"
import { Link } from "gatsby"
import styles from "./404.module.scss"

export default function NotFoundPage() {
  return (
    <main id="not-found-page" className="content">
      <div className="grid">
        <div className={styles.notFoundImage}></div>
        <div className={styles.description}>
          <h1>Oh no!</h1>
          <p>It seems that the page you are trying to reach doesn't exist or is not available. Please try again :)</p>
          <div><Link to="/">Go to Homepage</Link></div>
        </div>
      </div>
    </main>
  )
}

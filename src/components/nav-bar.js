import React from "react"
import styles from "./nav-bar.module.scss"
import { Link } from "gatsby"

export default function NavBar() {
  return (
    <header id={styles.navBar} className="outer-content">
      <h3 className={styles.logo}>
        <Link to="/">celia gómez de villavedón pedrosa</Link>
      </h3>
      <ul className={styles.menu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/#about">About</Link>
        </li>
        <li>
          <Link to="/#projects">Projects</Link>
        </li>
        <li>
          <Link to="/#skills">Skills</Link>
        </li>
        <li>
          <Link to="/#inspiration">Inspiration</Link>
        </li>
      </ul>
    </header>
  )
}

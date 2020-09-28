import React, { useContext } from "react"
import styles from "./nav-bar.module.scss"
import { Link } from "gatsby"
import { Context } from "../context"

export default function NavBar() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)

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
          <Link to="/#middle-section-module--middle-section--8npu3" 
          onClick={() => dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: 0 })}
          >About</Link>
        </li>
        <li>
          <Link to="/#middle-section-module--middle-section--8npu3"
          onClick={() => dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: 1 })}
          >Projects</Link>
        </li>
        <li>
          <Link to="/#middle-section-module--middle-section--8npu3"
          onClick={() => dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: 2 })}
          >Skills</Link>
        </li>
        <li>
          <Link to="/#contact">Contact</Link>
        </li>
      </ul>
    </header>
  )
}

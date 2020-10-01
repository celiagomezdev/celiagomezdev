import React, { useContext } from "react"
import styles from "./nav-bar.module.scss"
import { Link } from "gatsby"
import { Context } from "../context"

export default function NavBar() {
  const [state, dispatch] = useContext(Context)
  const { activeslide, celiaAnimationFrame} = state

  const goToSlide = slide => {
    if (activeslide === 0 || celiaAnimationFrame !== "hello") dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: slide })
    // Add timeout for waiting celia to be downstairs before moving to the next slide
    else setTimeout(() => dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: slide }), 1500)
  }

  return (
    <header id={styles.navBar} className={`outer-content grid`}>
      <h3 className={styles.logo}>
        <Link to="/">celia gómez de villavedón pedrosa</Link>
      </h3>
      <ul className={styles.menu}>
        <li>
          <Link to="/"
          onClick={() => goToSlide(0)}
          >Home</Link>
        </li>
        <li>
          <Link to="/#middle-section-module--middle-section--8npu3" 
          onClick={() => goToSlide(0)}
          >About</Link>
        </li>
        <li>
          <Link to="/#middle-section-module--middle-section--8npu3"
          onClick={() => goToSlide(1)}
          >Projects</Link>
        </li>
        <li>
          <Link to="/#middle-section-module--middle-section--8npu3"
          onClick={() => goToSlide(2)}
          >Skills</Link>
        </li>
        <li>
          <Link to="/#contact">Contact</Link>
        </li>
      </ul>
    </header>
  )
}

import React, { useContext } from 'react'
import styles from './nav-bar.module.scss'
import { Link } from 'gatsby'
import { Context, actions } from '../context'
import HamburgerMenu from './hamburger-menu'

export default function NavBar() {
  const [state, dispatch] = useContext(Context)
  const { isMobile } = state

  return (
    <header id={styles.navBar} className={`outer-content grid`}>
      <h3 className={styles.logo}>
        <Link
          to="/"
          onClick={() => actions.moveCeliaToHome(0, state, dispatch)}
        >
          celia gómez de villavedón pedrosa
        </Link>
      </h3>
      {isMobile && <HamburgerMenu />}
      {!isMobile && (
        <ul className={styles.menu}>
          <li>
            <Link
              to="/"
              onClick={() => actions.moveCeliaToHome(0, state, dispatch)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/#middle-section-module--middle-section--8npu3"
              onClick={() => actions.moveToSlide(0, state, dispatch)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/#middle-section-module--middle-section--8npu3"
              onClick={() => actions.moveToSlide(1, state, dispatch)}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/#middle-section-module--middle-section--8npu3"
              onClick={() => actions.moveToSlide(2, state, dispatch)}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link to="/#contact">Contact</Link>
          </li>
        </ul>
      )}
    </header>
  )
}

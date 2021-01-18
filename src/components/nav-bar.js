import React, { useContext } from 'react'
import styles from './nav-bar.module.scss'
import { Link } from 'gatsby'
import { Context, actions } from '../context'
import HamburgerMenu from './hamburger-menu'

export default function NavBar() {
  const [state, dispatch] = useContext(Context)
  const { isMobile } = state

  const moveCeliaToHome = () => actions.moveCeliaToHome(0, state, dispatch)
  const moveToSlide = slide => () => actions.moveToSlide(slide, state, dispatch)

  return (
    <header id={styles.navBar} className={`outer-content grid`}>
      <h3 className={styles.logo}>
        <Link to="/" onClick={moveCeliaToHome}>
          celia gómez de villavedón pedrosa
        </Link>
      </h3>
      {isMobile && <HamburgerMenu />}
      {!isMobile && (
        <ul className={styles.menu}>
          <li>
            <Link to="/" onClick={moveCeliaToHome}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/#middle-section-module--middle-section--8npu3"
              onClick={moveToSlide(0)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/#middle-section-module--middle-section--8npu3"
              onClick={moveToSlide(1)}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/#middle-section-module--middle-section--8npu3"
              onClick={moveToSlide(2)}
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

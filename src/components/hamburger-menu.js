import React, { useState, useContext } from 'react'
import { Link } from 'gatsby'
import { Context, actions } from '../context'
import styles from './hamburger-menu.module.scss'

export default function HamburgerMenu() {
  const [shouldShowMenu, setShouldShowMenu] = useState(false)
  const [state, dispatch] = useContext(Context)

  return (
    <div id={styles.hamburgerMenuContainer}>
      <div
        id={styles.hamburgerMenuIcon}
        onClick={() => setShouldShowMenu(!shouldShowMenu)}
      ></div>
      {shouldShowMenu && (
        <nav id={styles.hamburgerMenu}>
          <ul>
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
        </nav>
      )}
    </div>
  )
}

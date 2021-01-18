import React, { useState, useContext } from 'react'
import { Link } from 'gatsby'
import { Context, actions } from '../context'
import styles from './hamburger-menu.module.scss'

export default function HamburgerMenu() {
  const [shouldShowMenu, setShouldShowMenu] = useState(false)
  const [state, dispatch] = useContext(Context)

  const showMenu = () => setShouldShowMenu(!shouldShowMenu)
  const moveCeliaToHome = () => actions.moveCeliaToHome(0, state, dispatch)
  const moveToSlide = slide => () => actions.moveToSlide(slide, state, dispatch)

  return (
    <div id={styles.hamburgerMenuContainer}>
      <div id={styles.hamburgerMenuIcon} onClick={showMenu}></div>
      {shouldShowMenu && (
        <nav
          tabIndex="1"
          id={styles.hamburgerMenu}
          onBlur={() => setShouldShowMenu(false)}
        >
          <ul>
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
        </nav>
      )}
    </div>
  )
}

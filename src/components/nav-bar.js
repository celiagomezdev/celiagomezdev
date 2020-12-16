import React, { useContext } from 'react'
import styles from './nav-bar.module.scss'
import { Link } from 'gatsby'
import { Context } from '../context'
import { ACTION_TYPES } from '../constants/index'

export default function NavBar() {
  const [state, dispatch] = useContext(Context)
  const { celiaVerticalPosition } = state

  const goToSlide = slide => {
    if (celiaVerticalPosition === 'bottom') {
      // Everytime we move to a different slide, celia should be frontwards
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: 'front',
      })
      dispatch({ type: ACTION_TYPES.SET_ACTIVE_SLIDE, activeSlide: slide })
    } else {
      // Add timeout for waiting celia to be downstairs before moving to the next slide
      setTimeout(
        () =>
          dispatch({ type: ACTION_TYPES.SET_ACTIVE_SLIDE, activeSlide: slide }),
        2500
      )
    }
  }

  const goHome = () => {
    goToSlide(0)
    dispatch({
      type: ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION,
      celiaVerticalDirection: 'toTop',
    })
  }

  return (
    <header id={styles.navBar} className={`outer-content grid`}>
      <h3 className={styles.logo}>
        <Link to="/" onClick={() => goHome()}>
          celia gómez de villavedón pedrosa
        </Link>
      </h3>
      <ul className={styles.menu}>
        <li>
          <Link to="/"
          onClick={() => goHome()}
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

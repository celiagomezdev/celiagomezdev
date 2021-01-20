import React, { useRef, useEffect, useContext } from 'react'
import styles from './celia-animation.module.scss'
import celiaFramesImage from '../static/img/celia-frames.png'
import { Context, actions } from '../context'
import {
  ACTION_TYPES,
  CELIA_FRAMES_POSITION,
  CELIA_ANIMATION_FRAMES,
  CELIA_VERTICAL_POSITION,
  CELIA_VERTICAL_DIRECTION,
} from '../constants/index'

export default function CeliaAnimation() {
  const [state, dispatch] = useContext(Context)

  const {
    celiaAnimationFrame,
    celiaVerticalPosition,
    celiaVerticalDirection,
    animationMaxHeight,
    activeSlide,
  } = state

  const celiaAnimationRef = useRef()
  const celiaFramesRef = useRef()
  const climbLadderIntervalRef = useRef()
  const currentDirection = useRef()
  const currentPosition = useRef()
  const helloIntervalID = useRef(null)
  const _ = undefined

  const windowGlobal = typeof window !== 'undefined' && window
  const previousScroll = windowGlobal.scrollY

  useEffect(() => {
    // Set initial component state on first render
    dispatch({
      type: ACTION_TYPES.SET_ANIMATION_FRAME,
      celiaAnimationFrame: CELIA_ANIMATION_FRAMES.FRONT,
    })
    dispatch({
      type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
      celiaVerticalPosition: CELIA_VERTICAL_POSITION.TOP,
    })
  }, [dispatch])

  useEffect(() => {
    const newPosition =
      celiaVerticalDirection === CELIA_VERTICAL_DIRECTION.TO_BOTTOM
        ? CELIA_VERTICAL_POSITION.BOTTOM
        : CELIA_VERTICAL_POSITION.TOP
    if (currentPosition.current === newPosition) return
    currentPosition.current = newPosition

    celiaAnimationRef.current.addEventListener('transitionstart', () => {
      // We make sure that celia is backwards when the transition starts
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: CELIA_ANIMATION_FRAMES.BACK_RIGHT_SIDE,
      })
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
        celiaVerticalPosition: CELIA_VERTICAL_POSITION.TRANSITIONING,
      })
    })

    celiaAnimationRef.current.addEventListener('transitionend', () => {
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
        celiaVerticalPosition: currentPosition.current,
      })
    })
  }, [celiaVerticalDirection, dispatch])

  useEffect(() => {
    // Fallback in case we receive IDLE
    const newFrame =
      celiaAnimationFrame === CELIA_ANIMATION_FRAMES.IDLE
        ? CELIA_ANIMATION_FRAMES.FRONT
        : celiaAnimationFrame
    celiaFramesRef.current.style.setProperty(
      '--animation-frame-position',
      `${CELIA_FRAMES_POSITION[newFrame]}rem`
    )
  }, [celiaAnimationFrame])

  useEffect(() => {
    switch (celiaVerticalPosition) {
      case CELIA_VERTICAL_POSITION.TOP: {
        dispatch({
          type: ACTION_TYPES.SET_ANIMATION_FRAME,
          celiaAnimationFrame: CELIA_ANIMATION_FRAMES.FRONT,
        })
        helloIntervalID.current = setInterval(
          () => actions.setCeliaAnimation(_, _, dispatch),
          5000
        )
        break
      }
      case CELIA_VERTICAL_POSITION.BOTTOM: {
        if (activeSlide === 0)
          dispatch({
            type: ACTION_TYPES.SET_ANIMATION_FRAME,
            celiaAnimationFrame: CELIA_ANIMATION_FRAMES.FRONT,
          })
        break
      }
      default:
        break
    }

    return () => {
      clearInterval(helloIntervalID.current)
    }
  }, [celiaVerticalPosition, _, activeSlide, dispatch])

  useEffect(() => {
    if (celiaVerticalPosition === CELIA_VERTICAL_POSITION.TRANSITIONING) {
      climbLadderIntervalRef.current = setInterval(
        () => actions.setCeliaAnimation(0, celiaAnimationFrame, dispatch),
        400
      )
    }

    return () => {
      clearInterval(climbLadderIntervalRef.current)
    }
  }, [celiaVerticalPosition, celiaAnimationFrame, dispatch])

  useEffect(() => {
    switch (celiaVerticalDirection) {
      case CELIA_VERTICAL_DIRECTION.TO_TOP: {
        if (windowGlobal.scrollY === 0) return
        celiaAnimationRef.current.style.setProperty(
          'transform',
          `translateY(0)`
        )
        break
      }
      case CELIA_VERTICAL_DIRECTION.TO_BOTTOM: {
        // TODO: find a better way to set the maximum height without adding those extra 2px
        celiaAnimationRef.current.style.setProperty(
          'transform',
          `translateY(${animationMaxHeight + 2}px)`
        )
        break
      }
      default:
        break
    }
    // We needed to exclude windowGlobal.scrollY as dependency, it was casing double invocation of the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalDirection, animationMaxHeight])

  useEffect(() => {
    const animationGoTo = direction => {
      if (currentDirection.current === direction) return
      currentDirection.current = direction
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION,
        celiaVerticalDirection: direction,
      })
    }

    windowGlobal.onscroll = () => {
      /* Early return if we are positioned below 
      the middle section or we are not in the initial slide */
      if (windowGlobal.scrollY > 500 || activeSlide !== 0) return
      const isUserScrollingDown = previousScroll < windowGlobal.scrollY
      const isUserScrollingUp = previousScroll > windowGlobal.scrollY
      // Early return if user scrolls up but celia is already on top
      if (
        isUserScrollingUp &&
        celiaVerticalPosition === CELIA_VERTICAL_POSITION.TOP
      )
        return
      animationGoTo(
        isUserScrollingDown
          ? CELIA_VERTICAL_DIRECTION.TO_BOTTOM
          : CELIA_VERTICAL_DIRECTION.TO_TOP
      )
    }
  }, [
    windowGlobal,
    activeSlide,
    previousScroll,
    celiaVerticalPosition,
    dispatch,
  ])

  return (
    <div
      id={styles.celiaAnimation}
      className="content grid"
      ref={celiaAnimationRef}
    >
      <div className={styles.celiaContainer}>
        <div className={styles.celia} ref={celiaFramesRef}>
          <img src={celiaFramesImage} alt="Celia Animation"></img>
        </div>
      </div>
    </div>
  )
}

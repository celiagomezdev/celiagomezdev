import React, { useRef, useEffect, useContext } from 'react'
import styles from './celia-animation.module.scss'
import celiaFramesImage from '../static/img/celia-frames.png'
import { Context } from '../context'
import { ACTION_TYPES, CELIA_FRAMES_POSITION } from '../constants/index'

// TODO: clean animation logics, consider moving them to actions/custom hooks file.
// TODO: Check exhaustive deps issue
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

  const windowGlobal = typeof window !== 'undefined' && window
  const previousScroll = windowGlobal.scrollY

  useEffect(() => {
    // Set initial component state on first render
    dispatch({
      type: ACTION_TYPES.SET_ANIMATION_FRAME,
      celiaAnimationFrame: 'FRONT',
    })
    dispatch({
      type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
      celiaVerticalPosition: 'top',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newPosition = celiaVerticalDirection === 'toBottom' ? 'bottom' : 'top'
    if (currentPosition.current === newPosition) return
    currentPosition.current = newPosition

    celiaAnimationRef.current.addEventListener('transitionstart', () => {
      // We make sure that celia is backwards when the transition starts
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: 'BACK_RIGHT_SIDE',
      })
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
        celiaVerticalPosition: 'transitioning',
      })
    })

    celiaAnimationRef.current.addEventListener('transitionend', () => {
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
        celiaVerticalPosition: currentPosition.current,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalDirection])

  useEffect(() => {
    // Fallback in case we receive IDLE
    const newFrame =
      celiaAnimationFrame === 'IDLE' ? 'FRONT' : celiaAnimationFrame
    celiaFramesRef.current.style.setProperty(
      '--animation-frame-position',
      `${CELIA_FRAMES_POSITION[newFrame]}rem`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaAnimationFrame])

  const helloAnimation = () => {
    dispatch({
      type: ACTION_TYPES.SET_ANIMATION_FRAME,
      celiaAnimationFrame: 'FRONT_HELLO',
    })
    setTimeout(
      () =>
        dispatch({
          type: ACTION_TYPES.SET_ANIMATION_FRAME,
          celiaAnimationFrame: 'FRONT',
        }),
      1000
    )
  }

  useEffect(() => {
    switch (celiaVerticalPosition) {
      case 'top': {
        dispatch({
          type: ACTION_TYPES.SET_ANIMATION_FRAME,
          celiaAnimationFrame: 'FRONT',
        })
        helloIntervalID.current = setInterval(() => helloAnimation(), 5000)
        break
      }
      case 'bottom': {
        if (activeSlide === 0)
          dispatch({
            type: ACTION_TYPES.SET_ANIMATION_FRAME,
            celiaAnimationFrame: 'FRONT',
          })
        break
      }
      default:
        break
    }

    return () => {
      clearInterval(helloIntervalID.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalPosition])

  const climbAnimation = () => {
    const newFramePosition =
      celiaAnimationFrame === 'BACK_RIGHT_SIDE'
        ? 'BACK_LEFT_SIDE'
        : 'BACK_RIGHT_SIDE'
    dispatch({
      type: ACTION_TYPES.SET_ANIMATION_FRAME,
      celiaAnimationFrame: newFramePosition,
    })
  }

  useEffect(() => {
    if (celiaVerticalPosition === 'transitioning') {
      climbLadderIntervalRef.current = setInterval(() => climbAnimation(), 400)
    }

    return () => {
      clearInterval(climbLadderIntervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalPosition, celiaAnimationFrame])

  useEffect(() => {
    switch (celiaVerticalDirection) {
      case 'toTop': {
        if (windowGlobal.scrollY === 0) return
        celiaAnimationRef.current.style.setProperty(
          'transform',
          `translateY(0)`
        )
        break
      }
      case 'toBottom': {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalDirection])

  useEffect(() => {
    windowGlobal.onscroll = () => {
      /* Early return if we are positioned below 
      the middle section or we are not in the initial slide */
      if (windowGlobal.scrollY > 500 || activeSlide !== 0) return
      const isGoingBottom = previousScroll < windowGlobal.scrollY
      animationGoTo(isGoingBottom ? 'toBottom' : 'toTop')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowGlobal, activeSlide, previousScroll])

  const animationGoTo = direction => {
    if (currentDirection.current === direction) return
    currentDirection.current = direction
    dispatch({
      type: ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION,
      celiaVerticalDirection: direction,
    })
  }

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

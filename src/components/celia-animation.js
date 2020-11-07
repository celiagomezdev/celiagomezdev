import React, { useRef, useEffect, useContext } from "react"
import styles from "./celia-animation.module.scss"
import celiaFramesImage from "../static/img/celia-frames.png"
import { Context } from "../context"
import { ACTION_TYPES } from "../constants/index"

// TODO: clean animation logics, consider moving them to a helpers/hooks file.
// TODO: Check exhaustive deps issue
export default function CeliaAnimation() {
  const [state, dispatch] = useContext(Context)

  const { 
    celiaAnimationFrame, 
    celiaVerticalPosition, 
    celiaVerticalDirection,
    animationIsTransitioning,
    animationMaxHeight,
    activeSlide
  } = state

  const celiaAnimationRef = useRef()
  const celiaFramesRef = useRef()
  const climbLadderIntervalRef = useRef()
  const currentDirection = useRef()
  const currentPosition = useRef()
  const helloIntervalID = useRef(null)

  const windowGlobal = typeof window !== 'undefined' && window
  const previousScroll = windowGlobal.scrollY

  const celiaFramesPosition = {
    front: 4,
    frontHello: -10.65,
    backOne: -27.4,
    backRightSide: -42.5,
    backLeftSide: -58.7,
    backTwo: -74.5,
    backThree: -90.3,
    sitOne: -109.1,
    sitTwo: -128
  }

  useEffect(() => {
    // Set initial component state on first render
    dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "front"})
    dispatch({ type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION, celiaVerticalPosition: "top"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newPosition = celiaVerticalDirection === "toBottom" ? "bottom" : "top"
    if (currentPosition.current === newPosition) return
    currentPosition.current = newPosition

    celiaAnimationRef.current.addEventListener("transitionstart", () => {
      // We make sure that celia is backwards when the transition starts
      dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "backRightSide"})
      dispatch({ type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION, celiaVerticalPosition: "transitioning"})
    })

    celiaAnimationRef.current.addEventListener("transitionend", () => {
      dispatch({ type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION, celiaVerticalPosition: currentPosition.current})
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalDirection])

  useEffect(() => {
    // Fallback in case we receive idle
    const newFrame = celiaAnimationFrame === "idle" ? "front" : celiaAnimationFrame
    celiaFramesRef.current.style.setProperty('--animation-frame-position', 
        `${celiaFramesPosition[newFrame]}rem`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaAnimationFrame])

  useEffect(() => {
    const helloAnimation = () => {
      dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "frontHello"})
      setTimeout(() => dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "front"}), 1000)
    }

    const climbAnimation = () => {
      const newFramePosition = celiaAnimationFrame === "backRightSide" ?
      "backLeftSide" : "backRightSide"
      dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: newFramePosition})
    }

    switch (celiaVerticalPosition) {
      case "top": {
        dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "front"})
        helloIntervalID.current = setInterval(() => helloAnimation(), 5000)
        break
      }
      case "transitioning": {
        climbLadderIntervalRef.current = setInterval(() => climbAnimation(), 400)
        break
      }
      case "bottom": {
        if (activeSlide === 0) dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "front"})
        break
      }
      default:
        break
    }

    return () => {
      clearInterval(helloIntervalID.current)
      clearInterval(climbLadderIntervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationIsTransitioning, celiaAnimationFrame, celiaVerticalPosition])

  useEffect(() => {
    switch (celiaVerticalDirection) {
      case "toTop": {
        if (windowGlobal.scrollY === 0) return
        celiaAnimationRef.current.style.setProperty('transform', `translateY(0)`)
        break
      }
      case "toBottom": {
        // TODO: find a better way to set the maximum height without adding those extra 2px
        celiaAnimationRef.current.style.setProperty('transform', `translateY(${animationMaxHeight + 2}px)`)
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
      animationGoTo(isGoingBottom ? "toBottom" : "toTop")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowGlobal, activeSlide, previousScroll])

  const animationGoTo = (direction) => {
    if (currentDirection.current === direction) return
    currentDirection.current = direction
    dispatch({ type: ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION, celiaVerticalDirection: direction})
  }

  return(
    <div id={styles.celiaAnimation} className="content grid" ref={celiaAnimationRef}>
      <div className={styles.celiaContainer}>
        <div className={styles.celia} ref={celiaFramesRef}>
          <img src={celiaFramesImage} alt="Celia Animation"></img>
        </div>
      </div>
    </div>
  )
}

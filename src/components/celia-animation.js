import React, { useEffect, useContext } from "react"
import styles from "./celia-animation.module.scss"
import celiaFramesImage from "../static/img/celia-frames.png"
import { Context } from "../context"

export default function CeliaAnimation() {
  const [state, dispatch] = useContext(Context)
  const { celiaAnimationFrame } = state

  const celiaAnimationRef = React.useRef()
  const celiaFramesRef = React.useRef()
  const sayHelloIntervalRef = React.useRef()
  const climbLadderIntervalRef = React.useRef()
  const showIntervalRef = React.useRef()
  const typeIntervalRef = React.useRef()

  const celiaFramesPosition = {
    front: 3.5,
    frontHello: -8.4,
    backOne: -22,
    backRightSide: -34.6,
    backLeftSide: -48,
    backTwo: -61.2,
    backThree: -74.3,
    sitOne: -89.3,
    sitTwo: -105.6
  }

  // Subscribe to animations effect and update UI
  useEffect(() => {
    const wave = () => {
      celiaFramesRef.current.style.setProperty('--animation-frame-position', 
        `${celiaFramesPosition.frontHello}rem`)
      setTimeout(() => {
        celiaFramesRef.current.style.setProperty('--animation-frame-position', 
        `${celiaFramesPosition.front}rem`)
      }, 1000)
    }
  
    const climb = () => {
      const currentFrameValue = celiaFramesRef.current.style.getPropertyValue('--animation-frame-position')
      const setFramePosition = currentFrameValue === `${celiaFramesPosition.backRightSide}rem` ?
        celiaFramesPosition.backLeftSide : celiaFramesPosition.backRightSide
      celiaFramesRef.current.style.setProperty('--animation-frame-position', `${setFramePosition}rem`)
    }

    const show = () => {
      const currentFrameValue = celiaFramesRef.current.style.getPropertyValue('--animation-frame-position')
      const setFramePosition = currentFrameValue === `${celiaFramesPosition.backTwo}rem` ?
        celiaFramesPosition.backThree : celiaFramesPosition.backTwo
      celiaFramesRef.current.style.setProperty('--animation-frame-position', `${setFramePosition}rem`)
    }

    const type = () => {
      const currentFrameValue = celiaFramesRef.current.style.getPropertyValue('--animation-frame-position')
      const setFramePosition = currentFrameValue === `${celiaFramesPosition.sitOne}rem` ?
        celiaFramesPosition.sitTwo : celiaFramesPosition.sitOne
      celiaFramesRef.current.style.setProperty('--animation-frame-position', `${setFramePosition}rem`)
    }

    switch (celiaAnimationFrame) {
      case "hello": {
        celiaFramesRef.current.style.setProperty('--animation-frame-position', `${celiaFramesPosition.front}rem`)
        const helloIntervalId = setInterval(() => wave(), 6000)
        sayHelloIntervalRef.current = helloIntervalId
        break
      }
      case "climb": {
        const climbIntervalId = setInterval(() => climb(), 1000)
        climbLadderIntervalRef.current = climbIntervalId
        break
      }
      case "back": {
        celiaFramesRef.current.style.setProperty('--animation-frame-position', `${celiaFramesPosition.backOne}rem`)
        break
      }
      case "showing": {
        const showIntervalId = setInterval(() => show(), 1000)
        showIntervalRef.current = showIntervalId
        break
      }
      case "typing": {
        const typeIntervalId = setInterval(() => type(), 500)
        typeIntervalRef.current = typeIntervalId
        break
      }
      default:
        celiaFramesRef.current.style.setProperty('--animation-frame-position', `${celiaFramesPosition.front}rem`)    
    }

    return () => {
      clearInterval(sayHelloIntervalRef.current)
      clearInterval(climbLadderIntervalRef.current)
      clearInterval(showIntervalRef.current)
      clearInterval(typeIntervalRef.current)
    }
  }, [celiaAnimationFrame, celiaFramesPosition, dispatch])

  window.onscroll = () => {
    const scrollingValueWithSensitivity = window.scrollY/8
    moveCeliaDownAndUp(scrollingValueWithSensitivity)
    setCeliaFrame(scrollingValueWithSensitivity)
  }

  const moveCeliaDownAndUp = (scrollingValue) => {
    // Start movement
    if (scrollingValue > 3 && scrollingValue <= 35) {
      // We ensure that is in first position when scrolling
      dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: 0 })
      celiaAnimationRef.current.style.setProperty('transform', `translateY(${scrollingValue}rem)`)
    }
    // Ending position
    else if (scrollingValue > 35) 
      celiaAnimationRef.current.style.setProperty('transform', `translateY(36rem)`)
    // Initial position. Default.
    else celiaAnimationRef.current.style.setProperty('transform', `translateY(0rem)`)
  }

  const setCeliaFrame = (scrollingValue) => {
    if (scrollingValue === 0) setTimeout(() => dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "hello"}), 3000) // Delay for waiting the scroll up
    else if (scrollingValue > 0 && scrollingValue <= 5) dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "back"})
    else if (scrollingValue > 5 && scrollingValue < 35) dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "climb"})
    else if (scrollingValue > 35) setTimeout(() => dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "front"}), 3000) // Delay for waiting the scroll down
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

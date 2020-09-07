import React, { useEffect, useState } from "react"
import styles from "./celia-animation.module.scss"
import celiaFramesImage from "../static/img/celia-frames.png"

export default function CeliaAnimation() {
  const [celiaAnimationFrame, setCeliaAnimationFrame] = useState("hello")

  const celiaAnimation = React.useRef()
  const celiaFrames = React.useRef()
  const sayHelloIntervalRef = React.useRef()
  const climbLadderIntervalRef = React.useRef()

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
      celiaFrames.current.style.setProperty('--animation-frame-position', 
        `${celiaFramesPosition.frontHello}rem`)
      setTimeout(() => {
        celiaFrames.current.style.setProperty('--animation-frame-position', 
        `${celiaFramesPosition.front}rem`)
      }, 1000)
    }
  
    const climb = () => {
      const currentFrameValue = celiaFrames.current.style.getPropertyValue('--animation-frame-position')
      const setFramePosition = currentFrameValue === `${celiaFramesPosition.backRightSide}rem` ?
        celiaFramesPosition.backLeftSide : celiaFramesPosition.backRightSide
      celiaFrames.current.style.setProperty('--animation-frame-position', `${setFramePosition}rem`)
    }

    if (celiaAnimationFrame === "front") celiaFrames.current.style.setProperty('--animation-frame-position', `${celiaFramesPosition.front}rem`)
    else if (celiaAnimationFrame === "hello") {
      celiaFrames.current.style.setProperty('--animation-frame-position', `${celiaFramesPosition.front}rem`)
      const helloIntervalId = setInterval(() => wave(), 6000)
      sayHelloIntervalRef.current = helloIntervalId
    } else if (celiaAnimationFrame === "climb") {
      const climbIntervalId = setInterval(() => climb(), 1000)
      climbLadderIntervalRef.current = climbIntervalId
    } else if (celiaAnimationFrame === "back") {
      celiaFrames.current.style.setProperty('--animation-frame-position', `${celiaFramesPosition.backOne}rem`)
    }

    return () => {
      clearInterval(sayHelloIntervalRef.current)
      clearInterval(climbLadderIntervalRef.current)
    }
  }, [celiaAnimationFrame, celiaFramesPosition])

  window.onscroll = () => {
    const scrollingValueWithSensitivity = window.scrollY/8
    moveCeliaDownAndUp(scrollingValueWithSensitivity)
    setCeliaFrame(scrollingValueWithSensitivity)
  }

  const moveCeliaDownAndUp = (scrollingValue) => {
    // Start movement
    if (scrollingValue > 3 && scrollingValue <= 35)
      celiaAnimation.current.style.setProperty('transform', `translateY(${scrollingValue}rem)`)
    // Ending position
    else if (scrollingValue > 35) 
      celiaAnimation.current.style.setProperty('transform', `translateY(36rem)`)
    // Initial position. Default.
    else celiaAnimation.current.style.setProperty('transform', `translateY(0rem)`)
  }

  const setCeliaFrame = (scrollingValue) => {
    if (scrollingValue === 0) setTimeout(() => setCeliaAnimationFrame("hello"), 3000) // Delay for waiting the scroll up
    else if (scrollingValue > 0 && scrollingValue <= 5) setCeliaAnimationFrame("back")
    else if (scrollingValue > 5 && scrollingValue < 35) setCeliaAnimationFrame("climb")
    else if (scrollingValue > 35) setTimeout(() => setCeliaAnimationFrame("front"), 3000) // Delay for waiting the scroll down
  }

  return(
    <div id={styles.celiaAnimation} className="content grid" ref={celiaAnimation}>
      <div className={styles.celiaContainer}>
        <div className={styles.celia} ref={celiaFrames}>
          <img src={celiaFramesImage} alt="Celia Animation"></img>
        </div>
      </div>
    </div>
  )
}

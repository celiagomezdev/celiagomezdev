import React, { useEffect, useContext } from "react"
import styles from "./celia-animation.module.scss"
import celiaFramesImage from "../static/img/celia-frames.png"
import { Context } from "../context"

export default function CeliaAnimation() {
  const [state, dispatch] = useContext(Context)
  const { 
    celiaAnimationFrame, 
    celiaVerticalPosition, 
    animationIsTransitioning,
    animationMaxHeight,
    activeSlide
  } = state

  const celiaAnimationRef = React.useRef()
  const celiaFramesRef = React.useRef()
  const sayHelloIntervalRef = React.useRef()
  const climbLadderIntervalRef = React.useRef()
  const showIntervalRef = React.useRef()
  const typeIntervalRef = React.useRef()
  const currentDirection = React.useRef()

  const previousScroll = window.scrollY

  const celiaFramesPosition = {
    front: 3.8,
    frontHello: -10.9,
    backOne: -27.4,
    backRightSide: -42.5,
    backLeftSide: -58.7,
    backTwo: -74.5,
    backThree: -90.3,
    sitOne: -109.1,
    sitTwo: -128
  }

  React.useEffect(() => {
    celiaAnimationRef.current.addEventListener("transitionrun", () => {
      dispatch({ type: "SET_ANIMATION_IS_TRANSITIONING", animationIsTransitioning: true})
    })
    celiaAnimationRef.current.addEventListener("transitionend", () => {
      dispatch({ type: "SET_ANIMATION_IS_TRANSITIONING", animationIsTransitioning: false})
    })
  }, [celiaAnimationRef, dispatch])

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
        const helloIntervalId = setInterval(() => wave(), 5000)
        sayHelloIntervalRef.current = helloIntervalId
        break
      }
      case "climb": {
        climb()
        const climbIntervalId = setInterval(() => climb(), 400)
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

  useEffect(() => {
    if (animationIsTransitioning) return
    switch (celiaVerticalPosition) {
      case "top": {
        dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "hello"})
        if (window.scrollY === 0) return
        celiaAnimationRef.current.style.setProperty('transform', `translateY(0)`)
        break
      }
      case "bottom": {
        celiaAnimationRef.current.style.setProperty('transform', `translateY(${animationMaxHeight + 2}px)`)
        dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "front"})
        break
      }
      default:
        break
    }
  }, [animationIsTransitioning, celiaVerticalPosition, dispatch, animationMaxHeight])

  useEffect(() => {
    if (animationIsTransitioning) {
      dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "climb"})
    }
  }, [animationIsTransitioning, dispatch])

  window.onscroll = () => {
    if (activeSlide !== 0) return
    const isGoingDown = previousScroll < window.scrollY
    animationGoTo(isGoingDown ? "bottom" : "top")
  }

  const animationGoTo = (direction) => {
    if (currentDirection.current === direction) return
    currentDirection.current = direction
    dispatch({ type: "SET_CELIA_VERTICAL_POSITION", celiaVerticalPosition: direction})
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

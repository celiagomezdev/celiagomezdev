import React, { useContext, useEffect, useState } from "react"
import classNames from "classnames"
import styles from "./carousel.module.scss"
import arrow from "../static/img/arrow.svg"
import { Context } from "../context"
import { ACTION_TYPES } from "../constants/index"

export default function Carousel() {
  const [sliderWidth, setSliderWidth] = useState()
  // Use Context for accessing the state and actions to dispatch
  const [state, dispatch] = useContext(Context)
  const { activeSlide, celiaAnimationFrame } = state

  const numberOfSlides = 3
  const slider = React.useRef()
  const showIntervalRef = React.useRef()
  const typeIntervalRef = React.useRef()

  const windowGlobal = typeof window !== 'undefined' && window

  useEffect(() => {
    /**
     * Set the position of each slide.
     * We use negative values because we move them to the left.
     */
    const sliderWidthOnRender = parseInt(getComputedStyle(slider.current).width, 10)
    setSliderWidth(sliderWidthOnRender)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const sliderTransformPosition = sliderWidth * activeSlide
    slider.current.style.transform = `translateX(-${sliderTransformPosition}px)`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlide, sliderWidth])

  useEffect(() => {
    const sliderHeight = parseInt(getComputedStyle(slider.current).height, 10)
    dispatch({ type: ACTION_TYPES.SET_ANIMATION_MAX_HEIGHT, animationMaxHeight: sliderHeight})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    const showAnimation = () => {
      const newFramePosition = celiaAnimationFrame === "backTwo" ?
      "backThree" : "backTwo"
      dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: newFramePosition})
    }
  
    const typeAnimation = () => {
      const newFramePosition = celiaAnimationFrame === "sitOne" ?
      "sitTwo" : "sitOne"
      dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: newFramePosition})
    }

    switch(activeSlide) {
      case 1:
        const showIntervalId = setInterval(() => showAnimation(), 1000)
        showIntervalRef.current = showIntervalId
        break
      case 2: 
        const typeIntervalId = setInterval(() => typeAnimation(), 500)
        typeIntervalRef.current = typeIntervalId
        break
      default:
        break
    }

    return () => {
      clearInterval(showIntervalRef.current)
      clearInterval(typeIntervalRef.current)
    }
  }, [activeSlide, celiaAnimationFrame, dispatch])

  useEffect(() => {
    windowGlobal.onresize = () => {
      const sliderWidthOnResize = parseInt(getComputedStyle(slider.current).width, 10)
      setSliderWidth(sliderWidthOnResize)
    }
  },[windowGlobal])

  const moveToSlide = position => {
    // Everytime we move to a different slide, Celia is looking upfront
    dispatch({ type: ACTION_TYPES.SET_ANIMATION_FRAME, celiaAnimationFrame: "front"})
    dispatch({ type: ACTION_TYPES.SET_ACTIVE_SLIDE, activeSlide: position })
  }

  const moveToNext = () => {
    moveToSlide(activeSlide + 1)
  }

  const moveToPrevious = () => {
    moveToSlide(activeSlide - 1)
  }

  const displayNumberOfSlides = number => {
    return new Array(number).fill().map(function (slide, index) {
      return (
        <div 
          className={styles.slide} 
          aria-label={`Slide number ${index}`}
          aria-current={activeSlide === index}
          data-position={index}
          key={index}>
        </div>
      )
    })
  }

  const displayNumberOfBullets = number => {
    const setBulletClass = position =>
      classNames({
        [styles.bullet]: true,
        [styles.active]: activeSlide === position,
      })

    return new Array(number).fill().map(function (slide, index) {
      return (
        <span
          className={setBulletClass(index)}
          key={index}
          aria-label={`Go to slide ${index}`}
          onClick={() => moveToSlide(index)}
        ></span>
      )
    })
  }

  const slides = displayNumberOfSlides(numberOfSlides)
  const bullets = displayNumberOfBullets(numberOfSlides)
  /* TODO: Consider bringing this functionality back once 
  whe figure out how to test it with RTL */
  // const celiaIsOnHero = !animationIsTransitioning && celiaVerticalPosition === "top"

  const leftArrowClass = classNames({
    [styles.arrow]: true,
    [styles.left]: true,
    [styles.hidden]: activeSlide === 0,
  })

  const rightArrowClass = classNames({
    [styles.arrow]: true,
    [styles.right]: true,
    [styles.hidden]: activeSlide === 2
  })

  return (
    <div id={styles.carouselContainer}>
      <div id={styles.sliderContainer}>
        <button aria-label="Go to previous slide" className={leftArrowClass} onClick={() => moveToPrevious()}>
          <img src={arrow} alt="Arrow Left"></img>
        </button>
        <div className={styles.slides} ref={slider}>
          {slides}
        </div>
        <button aria-label="Go to next slide" className={rightArrowClass} onClick={() => moveToNext()}>
          <img src={arrow} alt="Arrow Right"></img>
        </button>
      </div>
      <div id={styles.bulletsMenuContainer}>
        <div className={styles.bulletsMenu}>{bullets}</div>
      </div>
    </div>
  )
}

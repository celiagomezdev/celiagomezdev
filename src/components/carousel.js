import React, { useContext, useEffect } from "react"
import classNames from "classnames"
import styles from "./carousel.module.scss"
import arrow from "../static/img/arrow.svg"
import { Context } from "../context"

export default function Carousel() {
  // Use Context for accessing the state and actions to dispatch
  const [state, dispatch] = useContext(Context)
  const { activeSlide } = state

  const numberOfSlides = 3
  const slider = React.createRef()

  // Effect for defining celia animation in each slide
  useEffect(() => {
    switch(activeSlide) {
      case 1:
        // When coming from sit position we ensure celia is stand up
        dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "front"})
        setTimeout (() => dispatch(
          { type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "showing"}), 200)
        break
      case 2: 
        dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "typing"})
        break
      default: 
        dispatch({ type: "SET_ANIMATION_FRAME", celiaAnimationFrame: "hello"})
    }
  }, [activeSlide, dispatch])

  const moveToSlide = position => {
    // Dispatch setActiveSlide action to update activeSlide state
    dispatch({ type: "SET_ACTIVE_SLIDE", activeSlide: position })

    /**
     * Set the position of each slide.
     * We use negative values because we move them to the left.
     */
    const currentSlider = slider.current
    const sliderWidth = parseInt(getComputedStyle(currentSlider).width, 10)
    const sliderTransformPosition = sliderWidth * position
    currentSlider.style.transform = `translateX(-${sliderTransformPosition}px)`
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
        <div className={styles.slide} data-position={index} key={index}></div>
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
          onClick={() => moveToSlide(index)}
        ></span>
      )
    })
  }

  const slides = displayNumberOfSlides(numberOfSlides)
  const bullets = displayNumberOfBullets(numberOfSlides)

  const leftArrowClass = classNames({
    [styles.arrow]: true,
    [styles.left]: true,
    [styles.hidden]: activeSlide === 0,
  })

  const rightArrowClass = classNames({
    [styles.arrow]: true,
    [styles.right]: true,
    [styles.hidden]: activeSlide === 2,
  })

  return (
    <div id={styles.carouselContainer}>
      <div id={styles.sliderContainer}>
        <div className={leftArrowClass} onClick={() => moveToPrevious()}>
          <img src={arrow} alt="Arrow Left"></img>
        </div>
        <div className={styles.slides} ref={slider}>
          {slides}
        </div>
        <div className={rightArrowClass} onClick={() => moveToNext()}>
          <img src={arrow} alt="Arrow Right"></img>
        </div>
      </div>
      <div id={styles.bulletsMenuContainer}>
        <div className={styles.bulletsMenu}>{bullets}</div>
      </div>
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './carousel.module.scss'
import arrow from '../static/img/arrow.svg'
import { Context, actions } from '../context'
import { ACTION_TYPES, CELIA_VERTICAL_POSITION } from '../constants/index'

export default function Carousel() {
  const [sliderWidth, setSliderWidth] = useState()
  const [state, dispatch] = useContext(Context)
  const { activeSlide, celiaAnimationFrame, celiaVerticalPosition } = state

  const numberOfSlides = 3
  const slider = React.useRef()
  const showIntervalRef = React.useRef()
  const typeIntervalRef = React.useRef()

  const windowGlobal = typeof window !== 'undefined' && window

  useEffect(() => {
    const sliderWidthOnRender = parseInt(
      getComputedStyle(slider.current).width,
      10
    )
    setSliderWidth(sliderWidthOnRender)
  }, [])

  useEffect(() => {
    const sliderTransformPosition = sliderWidth * activeSlide
    /**
     * Set the position of each slide.
     * We use negative values because we move them to the left.
     */
    slider.current.style.transform = `translateX(-${sliderTransformPosition}px)`
  }, [activeSlide, sliderWidth])

  useEffect(() => {
    const sliderHeight = parseInt(getComputedStyle(slider.current).height, 10)
    dispatch({
      type: ACTION_TYPES.SET_ANIMATION_MAX_HEIGHT,
      animationMaxHeight: sliderHeight,
    })
  }, [dispatch])

  useEffect(() => {
    switch (activeSlide) {
      case 1:
        const showIntervalId = setInterval(
          () =>
            actions.setCeliaAnimation(
              activeSlide,
              celiaAnimationFrame,
              dispatch
            ),
          1000
        )
        showIntervalRef.current = showIntervalId
        break
      case 2:
        const typeIntervalId = setInterval(
          () =>
            actions.setCeliaAnimation(
              activeSlide,
              celiaAnimationFrame,
              dispatch
            ),
          500
        )
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
      const sliderWidthOnResize = parseInt(
        getComputedStyle(slider.current).width,
        10
      )
      setSliderWidth(sliderWidthOnResize)
    }
  }, [windowGlobal])

  const moveToNext = () => actions.moveToSlide(activeSlide + 1, state, dispatch)

  const moveToPrevious = () =>
    actions.moveToSlide(activeSlide - 1, state, dispatch)

  const moveToSlide = index => () => actions.moveToSlide(index, state, dispatch)

  const displayNumberOfSlides = number => {
    return new Array(number).fill().map(function (slide, index) {
      return (
        <div
          className={styles.slide}
          aria-label={`Slide number ${index}`}
          aria-current={activeSlide === index}
          data-position={index}
          key={index}
        ></div>
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
          onClick={moveToSlide(index, state, dispatch)}
        ></span>
      )
    })
  }

  const slides = displayNumberOfSlides(numberOfSlides)
  const bullets = displayNumberOfBullets(numberOfSlides)
  const celiaIsOnHero = celiaVerticalPosition === CELIA_VERTICAL_POSITION.TOP

  const leftArrowClass = classNames({
    [styles.arrow]: true,
    [styles.left]: true,
    [styles.hidden]: activeSlide === 0,
  })

  const rightArrowClass = classNames({
    [styles.arrow]: true,
    [styles.right]: true,
    [styles.hidden]: activeSlide === 2 || celiaIsOnHero,
  })

  return (
    <div id={styles.carouselContainer}>
      <div id={styles.sliderContainer}>
        <button
          aria-label="Go to previous slide"
          className={leftArrowClass}
          onClick={moveToPrevious}
        >
          <img src={arrow} alt="Arrow Left"></img>
        </button>
        <div className={styles.slides} ref={slider}>
          {slides}
        </div>
        <button
          aria-label="Go to next slide"
          className={rightArrowClass}
          onClick={moveToNext}
        >
          <img src={arrow} alt="Arrow Right"></img>
        </button>
      </div>
      <div id={styles.bulletsMenuContainer}>
        <div className={styles.bulletsMenu}>{bullets}</div>
      </div>
    </div>
  )
}

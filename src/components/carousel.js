import React from "react"
import classNames from "classnames"
import styles from "./carousel.module.scss"
import arrow from "../static/img/arrow.svg"

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlide: 0
    }

    this.numberOfSlides = 3
    this.slider = React.createRef()
  }

  moveToSlide(position) {
    this.setState({activeSlide: position})
    const currentSlider = this.slider.current

    /**
     * Set the position of each slide.
     * We use negative values because we move them to the left.
     */
    const sliderWidth = parseInt(getComputedStyle(currentSlider).width, 10)
    const sliderTransformPosition = sliderWidth * position
    currentSlider.style.transform = `translateX(-${sliderTransformPosition}px)`
  }

  moveToNext() {
    this.moveToSlide(this.state.activeSlide + 1)
  }

  moveToPrevious() {
    this.moveToSlide(this.state.activeSlide - 1)
  }

  displayNumberOfSlides(number) {
    return new Array(number)
      .fill()
      .map(function(slide, index) {
        return <div className={styles.slide} data-position={index} key={index}></div>
      })
  }

  displayNumberOfBullets(number) {
    const { activeSlide } = this.state
    const setBulletClass = position => classNames({
      [ styles.bullet ]: true,
      [ styles.active ]: activeSlide === position
    })

    return new Array(number)
      .fill()
      .map(function(slide, index) {
        return <span className={setBulletClass(index)} key={index}
        onClick={() => this.moveToSlide(index)}></span>
      }, this)
  }

  render() {
    const slides = this.displayNumberOfSlides(this.numberOfSlides)
    const bullets = this.displayNumberOfBullets(this.numberOfSlides)

    const leftArrowClass = classNames({
      [ styles.arrow ]: true,
      [ styles.left ]: true,
      [ styles.hidden ]: this.state.activeSlide === 0
    })

    const rightArrowClass = classNames({
      [ styles.arrow ]: true,
      [ styles.right ]: true,
      [ styles.hidden ]: this.state.activeSlide === 2
    })

    return (
      <div id={styles.carouselContainer}>
        <div id={styles.sliderContainer}>
          <div className={leftArrowClass} onClick={() => this.moveToPrevious()}>
            <img src={arrow} alt="Arrow Left"></img>
          </div>
          <div className={styles.slides} ref={this.slider}>
            { slides }
          </div>
          <div className={rightArrowClass} onClick={() => this.moveToNext()}>
            <img src={arrow} alt="Arrow Right"></img>
          </div>
        </div>
        <div id={styles.bulletsMenuContainer}>
          <div className={styles.bulletsMenu}>
            { bullets }
          </div>
        </div>
      </div>
    )
  }
}

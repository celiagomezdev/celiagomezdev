import React from "react"
import styles from "./celia-animation.module.scss"
import celiaFramesImage from "../static/img/celia-frames.png"

export default function CeliaAnimation() {
  const celiaAnimation = React.createRef()
  const celiaFrames = React.createRef()

  window.onscroll = () => moveCeliaDownAndUp()

  const moveCeliaDownAndUp = () => {
    const celiaStyle = celiaAnimation.current.style
    if (window.scrollY<=290) celiaStyle.setProperty('transform', `translateY(${window.scrollY/8}rem)`)
    else if (window.scrollY === 0) celiaStyle.setProperty('transform', `translateY(0rem)`)
    else celiaStyle.setProperty('transform', `translateY(36rem)`)
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

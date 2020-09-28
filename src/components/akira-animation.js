import React, { useState } from "react"
import styles from "./akira-animation.module.scss"
import akiraOpenEyes from "../static/img/eyes-open.svg"
import akiraAngryEyes from "../static/img/eyes-angry.svg"

export default function AkiraAnimation() {
  const [openEyesAreShown, setOpenEyesAreShown] = useState(false)
  const [angryEyesAreShown, setAngryEyesAreShown] = useState(false)

  const handleClick = () => {
    setAngryEyesAreShown(true)
    setOpenEyesAreShown(false)
    setTimeout(() => setAngryEyesAreShown(false), 2000)
  }

  const handleMouseEnter = () => {
    if (!angryEyesAreShown) setOpenEyesAreShown(true)
  }

  return (
    <div id={styles.akira}>
      <div className={styles.akiraTappableArea} 
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => setOpenEyesAreShown(false)}
        onClick={()=> handleClick()}>
        {openEyesAreShown && (
          <div className={`${styles.eye} ${styles.akiraOpenEyes}`}>
            <img src={akiraOpenEyes} alt="Akira Open Eyes"></img>
           </div>
        )}
        {angryEyesAreShown && (
          <div className={`${styles.eye} ${styles.akiraAngryEyes}`}>
            <img src={akiraAngryEyes} alt="Akira Angry Eyes"></img>
          </div>
        )}
      </div>
    </div>
  )
}

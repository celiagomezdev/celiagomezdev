import React from "react"
import styles from "./celia-animation.module.scss"
import celiaFrames from "../static/img/celia-frames.png"

export default function CeliaAnimation() {
  return(
    <div className={styles.celiaContainer}>
      <img src={celiaFrames} alt="Celia Animation"></img>
    </div>
  )
}

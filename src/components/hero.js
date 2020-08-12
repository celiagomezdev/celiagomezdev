import React from "react"
import styles from "./hero.module.scss"
import celiaImage from "../static/img/celia-1.svg"

export default function Hero() {
  return (
    <section id={styles.hero}>
      <div className={`${styles.heroContent} content grid`}>
        <div className={styles.heroTitle}><h1>Hello there!</h1></div>
        <div className={styles.celiaWrapper}>
          <img src={celiaImage} alt="Celia" />
        </div>
      </div>
      <div className={styles.floor}></div>
    </section>
  )
}

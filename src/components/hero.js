import React from "react"
import styles from "./hero.module.scss"
import HeroHomeImg from "../static/img/home.png"

export default function Hero() {
  return (
    <section id={styles.hero}>
      <div className={`content grid`}>
        <div className={styles.heroLeftBox}>
          <div className={styles.heroTitle}>
            <h1>Hello there!</h1>
          </div>
          <div className={styles.celia}>
          </div>
        </div>
        <img src={HeroHomeImg} className={styles.heroHomeImage} alt="Hero Home"/>
      </div>
      <div className={styles.floor}></div>
    </section>
  )
}

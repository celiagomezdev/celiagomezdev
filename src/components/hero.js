import React from "react"
import styles from "./hero.module.scss"
import HeroBackgroundImg from "../static/img/background-home.png"

export default function Hero() {
  return (
    <section id="hero">
      <img src={HeroBackgroundImg} className={styles.heroBgImage} alt="Hero Background"/>
      <div className={`content grid ${styles.heroTitleContainer}`}>
        <h1 className={styles.heroTitle}>HELLO THERE</h1>
      </div>
    </section>
  )
}

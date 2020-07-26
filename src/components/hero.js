import React from "react"
import styles from "./hero.module.scss"
import HeroHomeImg from "../static/img/home.png"

export default function Hero() {
  return (
    <section id={styles.hero}>
      <div className={`content grid`}>
        <div className={styles.heroTitleCard}>
          <h1>HELLO THERE!</h1>
        </div>
        <img src={HeroHomeImg} className={styles.heroImage} alt="Hero Home"/>
      </div>
      <div className={styles.floor}></div>
    </section>
  )
}

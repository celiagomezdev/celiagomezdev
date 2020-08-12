import React from "react"
import styles from "./hero.module.scss"

export default function Hero() {
  return (
    <section id={styles.hero}>
      <div className={`${styles.heroContent} content grid`}>
        <div className={styles.heroTitle}><h1>Hello there!</h1></div>
        <div className={styles.celiaWrapper}><div className={styles.celia}></div></div>
      </div>
    </section>
  )
}

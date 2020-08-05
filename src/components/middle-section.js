import React from "react"
import styles from "./middle-section.module.scss"

export default function MiddleSection() {
  return (
    <section id={styles.middleSection}>
      <div className="content grid">
        <div className={styles.carouselWrapper}></div>
        <div className={styles.textWrapper}></div>
      </div>
    </section>
  )
}

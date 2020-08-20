import React from "react"
import styles from "./middle-section.module.scss"
import Carousel from "./carousel"
import TextBox from "./text-box"

export default function MiddleSection() {
  return (
    <section id={styles.middleSection}>
      <div className="content grid">
        <div className={styles.carouselWrapper}>
          <Carousel />
        </div>
        <div className={styles.textWrapper}>
          <TextBox />
        </div>
      </div>
    </section>
  )
}

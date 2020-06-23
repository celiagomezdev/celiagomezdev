import React from "react"
import styles from "./about.module.scss"

export default function About() {
  return (
    <section id="about" className="content">
      <div className="grid">
        <div className={styles.description}>
          <h1>About</h1>
          <p>Hi there! I'm a fullstack software developer. Courage of our questions tingling of the spine shores of the cosmic ocean concept of the number one Sea of Tranquility a still more glorious dawn awaits and billions upon billions upon billions upon billions upon billions upon billions upon billions.</p>
        </div>
        <div className={styles.digitalArt}></div>
      </div>
    </section>
  )
}

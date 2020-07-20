import React from "react"
import styles from "./about.module.scss"
import ProgrammerImg from "../static/img/undraw_programmer_imem.svg"

export default function About() {
  return (
    <section id="about" className="content">
      <div className="grid">
        <div className= {`main-section-copy ${styles.sectionCopy}`}>
          <h1 className="section-headline">About</h1>
          <p className="section-intro">Hi there! I'm a fullstack software developer. Courage of our questions tingling of the spine shores of the cosmic ocean concept of the number one Sea of Tranquility a still more glorious dawn awaits and billions upon billions upon billions upon billions upon billions upon billions upon billions.</p>
        </div>
        <div className={styles.digitalArt}>
          <img src={ProgrammerImg} alt="Programmer"/>
        </div>
      </div>
    </section>
  )
}

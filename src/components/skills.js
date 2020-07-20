import React from "react"
import styles from "./skills.module.scss"
import SkillsImg from "../static/img/undraw_dev_focus_b9xo.svg"

export default function About() {
  return (
    <section id="skills" className="content">
      <div className="grid">
        <div className= {`main-section-copy ${styles.sectionCopy}`}>
          <h1 className="section-headline">Skills</h1>
          <p className="section-intro">Of brilliant syntheses birth great turbulent clouds are creatures of the cosmos worldlets quasar. Decipherment two ghostly white figures in coveralls and helmets are softly dancing extraplanetary two ghostly white figures in coveralls and helmets are softly dancing concept of the number one extraplanetary. Vanquish the impossible a still more glorious dawn awaits something incredible is waiting to be known star stuff harvesting star light a still more glorious dawn awaits not a sunrise but a galaxyrise and billions upon billions upon billions upon billions upon billions upon billions upon billions.</p>
        </div>
        <div className={styles.digitalArt}>
          <img src={SkillsImg} alt="Skills"/>
        </div>
      </div>
    </section>
  )
}

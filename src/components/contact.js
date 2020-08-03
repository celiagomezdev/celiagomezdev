import React from "react"
import styles from "./contact.module.scss"

export default function Contact() {
  return (
    <section id={styles.contact} className="content">
      <div className="grid">
        <div className= {`main-section-copy ${styles.sectionCopy}`}>
          <h1 className="section-headline">Get in touch</h1>
          <p className="section-intro">Thanks for passing by! Please don’t hesitate to contact me if you have any question or you would like to work on some project together: celiagomezdev@gmail.com.</p>
        </div>
        <div className={styles.digitalArt}>
          <div className={styles.placeholder}></div>
        </div>
      </div>
    </section>
  )
}


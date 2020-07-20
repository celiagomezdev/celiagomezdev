import React from "react"
import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className="content">
      <div className={styles.info}>
        <p className="small-text">Celia Gómez de Villavedón Pedrosa © 2020 ~ Illustrations by Katerina Limpitsouni <a href="https://undraw.co/" target="_blank" rel="noreferrer">undraw.co</a></p>
      </div>
      <div className={styles.socialMedia}>Social Media</div>
        {/* <div className={styles.email}></div>
        <div className={styles.github}></div>
        <div className={styles.linkedin}></div>
        <div className={styles.instagram}></div> */}
    </footer>
  )
}

import React from "react"
import styles from "./footer.module.scss"
import EmailIcon from "../static/img/mail_icon.svg"
import GithubIcon from "../static/img/github_icon.svg"
import LinkedinIcon from "../static/img/linkedin_icon.svg"
import TwitterIcon from "../static/img/twitter_icon.svg"
import InstagramIcon from "../static/img/instagram_icon.svg"

export default function Footer() {
  return (
    <footer className="outer-content">
      <div className={styles.info}>
        <p className="small-text">Celia Gómez de Villavedón Pedrosa © 2020 ~ Illustrations by Katerina Limpitsouni <a href="https://undraw.co/" target="_blank" rel="noreferrer">undraw.co</a></p>
      </div>
      <div className={styles.socialMedia}>
        <div className={styles.icon}>
          <a href="mailto:celiagomezdev@gmail.com">
            <img src={EmailIcon} alt="Email Icon" />
          </a>
        </div>
        <div className={styles.icon}>
          <a href="https://github.com/celiagomezdev" target="_blank" rel="noreferrer">
            <img src={GithubIcon} alt="Github Icon" />
          </a>
        </div>
        <div className={styles.icon}>
          <a href="https://www.linkedin.com/in/celiagomezdev/?locale=en_US" target="_blank" rel="noreferrer">
            <img src={LinkedinIcon} alt="Linkedin Icon" />
          </a>
        </div>
        <div className={styles.icon}>
          <a href="https://twitter.com/celiagomezdev" target="_blank" rel="noreferrer">
            <img src={TwitterIcon} alt="Twitter Icon" />
          </a>
        </div>
        <div className={styles.icon}>
          <a href="https://www.instagram.com/celiagomezdev" target="_blank" rel="noreferrer">
            <img src={InstagramIcon} alt="Instagram Icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}

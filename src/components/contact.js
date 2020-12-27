import React from 'react'
import styles from './contact.module.scss'
import AkiraAnimation from './akira-animation'

export default function Contact() {
  return (
    <section id="contact" className={`content grid`}>
      <div className={styles.sectionCopy}>
        <h1>Get in touch</h1>
        <p>
          Drop me a line if you have any question or you would like to work
          together. It would be great to hear about you!{' '}
          <a href="mailto:celiagomezdev@gmail.com">celiagomezdev@gmail.com</a>
          .
          <br />
          <br />
          You can also check my{' '}
          <a
            href="https://github.com/celiagomezdev"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          ,{' '}
          <a
            href="https://www.linkedin.com/in/celiagomezdev/?locale=en_US"
            target="_blank"
            rel="noreferrer"
          >
            linkedIn
          </a>
          ,{' '}
          <a
            href="https://www.instagram.com/celiagomezdev"
            target="_blank"
            rel="noreferrer"
          >
            instagram
          </a>{' '}
          or{' '}
          <a
            href="https://cargocollective.com/celiagomezdev"
            target="_blank"
            rel="noreferrer"
          >
            cargo
          </a>{' '}
          (these last two with my personal analog pictures) to know a little bit
          more about me.
          <br />
          <br />
          See you soon! 🙋🏻‍♀️
        </p>
      </div>
      <div className={styles.imageSection}>
        <AkiraAnimation />
      </div>
    </section>
  )
}

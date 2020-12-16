import React, { useContext } from 'react'
import styles from './text-box.module.scss'
import TextContent from './text-content'
import { Context } from '../context'

export default function TextBox() {
  // Access the activeSlide state value
  const [{ activeSlide }] = useContext(Context)

  const currentSlide = activeSlide == null ? 0 : activeSlide

  return (
    <div id={styles.textBox}>
      <h1>{TextContent(currentSlide).title}</h1>
      <div className={styles.textContent}>
        {TextContent(currentSlide).description}
      </div>
    </div>
  )
}

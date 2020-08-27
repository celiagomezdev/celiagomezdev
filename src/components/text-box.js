import React, { useContext } from "react"
import styles from "./text-box.module.scss"
import TextContent from "./text-content"
import { Context } from "../context"

export default function TextBox() {
  // Access the activeSlide state value
  const [{ activeSlide }] = useContext(Context)

  return (
    <div id={styles.textBox}>
      <h1>{TextContent(activeSlide).title}</h1>
      <div className={styles.textContent}>
        {TextContent(activeSlide).description}
      </div>
    </div>
  )
}

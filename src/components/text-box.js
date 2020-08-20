import React from "react"
import styles from "./text-box.module.scss"
import { textContent } from "../lib/texts"

export default class TextBox extends React.Component {
  render() {
    return(
      <div id={styles.textBox}>
        <h1 className="section-headline">{textContent[0].title}</h1>
        <p className="section-intro">{textContent[0].description}</p>
      </div>
    )
  }
}

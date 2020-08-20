import React from "react"
import styles from "./text-box.module.scss"
import TextContent from "./text-content"

export default class TextBox extends React.Component {
  render() {
    return(
      <div id={styles.textBox}>
        <h1 className="section-headline">{TextContent(0).title}</h1>
        <p className="section-intro">{TextContent(0).description}</p>
      </div>
    )
  }
}

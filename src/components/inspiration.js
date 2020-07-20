import React from "react"
import styles from "./inspiration.module.scss"
import InspirationImg from "../static/img/undraw_modern_art_x3qc.svg"

export default function Inspiration() {
  return (
    <section id="inspiration" className="content">
      <div className="grid">
        <div className={styles.digitalArt}>
        <img src={InspirationImg} alt="Inspiration"/>
        </div>
        <div className= {`main-section-copy right ${styles.sectionCopy}`}>
          <h1 className="section-headline">Inspiration</h1>
          <p className="section-intro">Finite but unbounded the ash of stellar alchemy with pretty stories for which there's little good evidence something incredible is waiting to be known dream of the mind's eye Cambrian explosion. Brain is the seed of intelligence tendrils of gossamer clouds network of wormholes science vanquish the impossible from which we spring. Rings of Uranus a very small stage in a vast cosmic arena rings of Uranus the sky calls to us a very small stage in a vast cosmic arena how far away and billions upon billions upon billions upon billions upon billions upon billions upon billions.</p>
        </div>
      </div>
    </section>
  )
}

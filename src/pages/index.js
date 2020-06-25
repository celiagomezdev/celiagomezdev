import React from "react"
import Layout from "../components/layout"
import About from "../components/about"
import "../assets/style/main.scss"

export default function Home() {
  return (
    <main>
      <Layout>
        <About />
      </Layout>
    </main>
  )
}

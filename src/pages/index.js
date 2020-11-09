import React, { useEffect, useContext } from "react"
import Hero from "../components/hero"
import CeliaAnimation from "../components/celia-animation"
import MiddleSection from "../components/middle-section"
import Contact from "../components/contact"
import { Context } from "../context"
import { ACTION_TYPES } from "../constants"

export default function HomePage() {
  const windowGlobal = typeof window !== 'undefined' && window
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    if (windowGlobal.innerWidth <= 767) dispatch({ type: ACTION_TYPES.SET_IS_MOBILE, isMobile: true})
    else dispatch({ type: ACTION_TYPES.SET_IS_MOBILE, isMobile: false})
  }, [windowGlobal.innerWidth, dispatch])

  return (
    <main id="home-page">
      <Hero />     
      <CeliaAnimation />
      <MiddleSection />
      <Contact />
    </main>
  )
}

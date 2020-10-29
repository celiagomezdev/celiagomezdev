import React from "react"
import { render, screen } from "@testing-library/react"
import { Context } from "../../context"
import fs from 'fs'
import path from 'path'
import Carousel from "../carousel"

let state
// Mock dispatch method
const dispatch = jest.fn()

// Inject computed styles into jsdom
const injectCSS = (container) => {
  const cssFile = fs.readFileSync(
    path.resolve(__dirname, '../carousel.module.scss'),
    'utf8'
  )
  const style = document.createElement('style')
  style.innerHTML = cssFile
  container.append(style)
}

beforeEach(() => {
  // Mock state
  state = { activeSlide: 0 }

  // Render Carousel Component before each test
  const { container } = render(
    <Context.Provider value={[state, dispatch]}>
      <Carousel />
    </Context.Provider>
  )

  injectCSS(container)
})

describe("Carousel", () => {
  it("does not have a left arrow on the first slide", () => {
    const leftArrowButton = screen.getByLabelText("Go to previous slide")
    expect(leftArrowButton).not.toBeVisible()
  })

  it("does have a right arrow on the first slide", () => {
    const rightArrowButton = screen.getByLabelText("Go to next slide")
    expect(rightArrowButton).toBeVisible()
  })
})



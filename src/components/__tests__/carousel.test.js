import React from "react"
import { render, screen, fireEvent } from "../../../test.utils"
import fs from 'fs'
import path from 'path'
import Carousel from "../carousel"

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
  const { container } = render(<Carousel />)
  // Inject computed css into jsdom
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

  it("does have a right and a left arrow on the second slide", () => {
    const leftArrowButton = screen.getByLabelText("Go to previous slide")
    const rightArrowButton = screen.getByLabelText("Go to next slide")
    fireEvent.click(rightArrowButton)
    expect(leftArrowButton).toBeVisible()
    expect(rightArrowButton).toBeVisible()
  })

  it("does not have a right arrow on the last slide", () => {
    const rightArrowButton = screen.getByLabelText("Go to next slide")
    fireEvent.click(rightArrowButton)
    fireEvent.click(rightArrowButton)
    expect(rightArrowButton).not.toBeVisible()
  })
})



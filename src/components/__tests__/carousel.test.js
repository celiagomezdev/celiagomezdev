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

  it("moves to the next slide when clicking the right arrow", () => {
    const rightArrowButton = screen.getByLabelText("Go to next slide")
    const secondSlide = screen.getByLabelText("Slide number 1")
  
    fireEvent.click(rightArrowButton)

    /** In our carousel we set the current slide by animating the
     * parent container to the left (using transform: translateX).
     * As this is relying in the browser window size, we cannot test this value with RTL.
     * We can check instead the aria-current property, which is set to true when 
     * the slide matches the activeSlide state property.
     */
    expect(secondSlide).toHaveAttribute("aria-current", "true")

    // The other slides are not current
    const firstSlide = screen.getByLabelText("Slide number 0")
    const thirdSlide = screen.getByLabelText("Slide number 2")
    expect(firstSlide).toHaveAttribute("aria-current", "false")
    expect(thirdSlide).toHaveAttribute("aria-current", "false")
  })
})

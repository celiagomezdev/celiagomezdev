import React from "react"
import { render, screen } from "@testing-library/react"
import { Context } from "../../context"
import Carousel from "../carousel"

let state
const dispatch = jest.fn()

beforeEach(() => {
  state = { activeSlide: 0 }

  // render Carousel Component before each test
  render(
    <Context.Provider value={[state, dispatch]}>
      <Carousel />
    </Context.Provider>
  )
})

describe("Carousel", () => {
  it("has the left arrow button hidden on first slide (initial state)", () => {
    const leftArrowButton = screen.getByLabelText("Go to previous slide")
    expect(leftArrowButton).toHaveClass('hidden')
  })
})



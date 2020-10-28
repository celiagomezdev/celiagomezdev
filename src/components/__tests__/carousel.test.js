import React from "react"
import { render } from "@testing-library/react"
import { Context } from "../../context"
import Carousel from "../carousel"

let state
const dispatch = jest.fn()

beforeEach(() => {
  state = { activeSlide: 0 }
})

describe("Carousel", () => {
  it("renders correctly", () => {
    render(
      <Context.Provider value={[state, dispatch]}>
        <Carousel />
      </Context.Provider>
    )
  })
})



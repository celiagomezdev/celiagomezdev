import React from "react"

const initialState = {
  activeSlide: 0,
  celiaAnimationFrame: "hello"
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_SLIDE": {
      return {
        ...state,
        activeSlide: action.activeSlide,
      }
    }
    case "SET_ANIMATION_FRAME": {
      return {
        ...state,
        celiaAnimationFrame: action.celiaAnimationFrame,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

const Context = React.createContext(initialState)

export { Store, Context }

import React from 'react'
import actions from './actions'
import { ACTION_TYPES } from '../constants/index'

// TODO: Create enums for strings
const initialState = {
  activeSlide: 0,
  celiaAnimationFrame: 'idle',
  celiaVerticalPosition: 'idle',
  celiaVerticalDirection: 'idle',
  animationMaxHeight: null,
  isMobile: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ACTIVE_SLIDE: {
      return {
        ...state,
        activeSlide: action.activeSlide,
      }
    }
    case ACTION_TYPES.SET_CELIA_VERTICAL_POSITION: {
      return {
        ...state,
        celiaVerticalPosition: action.celiaVerticalPosition,
      }
    }
    case ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION: {
      return {
        ...state,
        celiaVerticalDirection: action.celiaVerticalDirection,
      }
    }
    case ACTION_TYPES.SET_ANIMATION_FRAME: {
      return {
        ...state,
        celiaAnimationFrame: action.celiaAnimationFrame,
      }
    }
    case ACTION_TYPES.SET_ANIMATION_MAX_HEIGHT: {
      return {
        ...state,
        animationMaxHeight: action.animationMaxHeight,
      }
    }
    case ACTION_TYPES.SET_IS_MOBILE: {
      return {
        ...state,
        isMobile: action.isMobile,
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

export { Store, Context, actions }

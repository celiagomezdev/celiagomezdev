import { ACTION_TYPES, CELIA_ANIMATION_FRAMES } from '../constants/index'

export default {
  moveToSlide(slide, state, dispatch) {
    if (
      state.celiaVerticalPosition === 'bottom' ||
      state.celiaVerticalPosition === CELIA_ANIMATION_FRAMES.IDLE
    ) {
      // Everytime we move to a different slide, celia should be frontwards
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: CELIA_ANIMATION_FRAMES.FRONT,
      })
      dispatch({ type: ACTION_TYPES.SET_ACTIVE_SLIDE, activeSlide: slide })
    } else {
      // Add timeout for waiting celia to be downstairs before moving to the next slide
      setTimeout(
        () =>
          dispatch({ type: ACTION_TYPES.SET_ACTIVE_SLIDE, activeSlide: slide }),
        2500
      )
    }
  },

  moveCeliaToHome(slide, state, dispatch) {
    this.moveToSlide(slide, state, dispatch)
    dispatch({
      type: ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION,
      celiaVerticalDirection: 'toTop',
    })
  },
}

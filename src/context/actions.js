import {
  ACTION_TYPES,
  CELIA_ANIMATION_FRAMES,
  CELIA_VERTICAL_POSITION,
  CELIA_VERTICAL_DIRECTION,
} from '../constants/index'

export default {
  moveToSlide(slide, state, dispatch) {
    if (
      state.celiaVerticalPosition === CELIA_VERTICAL_POSITION.BOTTOM ||
      state.celiaVerticalPosition === CELIA_VERTICAL_POSITION.IDLE
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
      celiaVerticalDirection: CELIA_VERTICAL_DIRECTION.TO_TOP,
    })
  },
  setCarouselAnimation(slide, frame, dispatch) {
    let newFramePosition
    switch (slide) {
      case 1:
        newFramePosition =
          frame === CELIA_ANIMATION_FRAMES.BACK_TWO
            ? CELIA_ANIMATION_FRAMES.BACK_THREE
            : CELIA_ANIMATION_FRAMES.BACK_TWO
        dispatch({
          type: ACTION_TYPES.SET_ANIMATION_FRAME,
          celiaAnimationFrame: newFramePosition,
        })
        break
      case 2:
        newFramePosition =
          frame === CELIA_ANIMATION_FRAMES.SIT_ONE
            ? CELIA_ANIMATION_FRAMES.SIT_TWO
            : CELIA_ANIMATION_FRAMES.SIT_ONE
        dispatch({
          type: ACTION_TYPES.SET_ANIMATION_FRAME,
          celiaAnimationFrame: newFramePosition,
        })
        break
      default:
        break
    }
  },
}

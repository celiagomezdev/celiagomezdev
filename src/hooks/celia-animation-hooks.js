import { useEffect } from 'react'
import { ACTION_TYPES } from '../constants/index'

// TODO: Check exhaustive deps issue
export function useFirstRenderEffect(dispatch) {
  useEffect(() => {
    // Set initial component state on first render
    dispatch({
      type: ACTION_TYPES.SET_ANIMATION_FRAME,
      celiaAnimationFrame: 'front',
    })
    dispatch({
      type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
      celiaVerticalPosition: 'top',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useAnimationFrameEffect(
  celiaAnimationFrame,
  celiaFramesRef,
  celiaFramesPosition
) {
  useEffect(() => {
    // Fallback in case we receive idle
    const newFrame =
      celiaAnimationFrame === 'idle' ? 'front' : celiaAnimationFrame
    celiaFramesRef.current.style.setProperty(
      '--animation-frame-position',
      `${celiaFramesPosition[newFrame]}rem`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaAnimationFrame])
}

export function useTransitionEffect(
  celiaAnimationRef,
  currentPosition,
  celiaVerticalDirection,
  dispatch
) {
  useEffect(() => {
    const newPosition = celiaVerticalDirection === 'toBottom' ? 'bottom' : 'top'
    if (currentPosition.current === newPosition) return
    currentPosition.current = newPosition

    celiaAnimationRef.current.addEventListener('transitionstart', () => {
      // We make sure that celia is backwards when the transition starts
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: 'backRightSide',
      })
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
        celiaVerticalPosition: 'transitioning',
      })
    })

    celiaAnimationRef.current.addEventListener('transitionend', () => {
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_POSITION,
        celiaVerticalPosition: currentPosition.current,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalDirection])
}

export function useVerticalDirectionEffect(
  celiaVerticalDirection,
  windowGlobal,
  celiaAnimationRef,
  animationMaxHeight
) {
  useEffect(() => {
    switch (celiaVerticalDirection) {
      case 'toTop': {
        if (windowGlobal.scrollY === 0) return
        celiaAnimationRef.current.style.setProperty(
          'transform',
          `translateY(0)`
        )
        break
      }
      case 'toBottom': {
        // TODO: find a better way to set the maximum height without adding those extra 2px
        celiaAnimationRef.current.style.setProperty(
          'transform',
          `translateY(${animationMaxHeight + 2}px)`
        )
        break
      }
      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalDirection])
}

export function useVerticalPositionEffect(
  celiaVerticalPosition,
  helloIntervalID,
  dispatch,
  activeSlide
) {
  useEffect(() => {
    const helloAnimation = () => {
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: 'frontHello',
      })
      setTimeout(
        () =>
          dispatch({
            type: ACTION_TYPES.SET_ANIMATION_FRAME,
            celiaAnimationFrame: 'front',
          }),
        1000
      )
    }

    switch (celiaVerticalPosition) {
      case 'top': {
        dispatch({
          type: ACTION_TYPES.SET_ANIMATION_FRAME,
          celiaAnimationFrame: 'front',
        })
        helloIntervalID.current = setInterval(() => helloAnimation(), 5000)
        break
      }
      case 'bottom': {
        if (activeSlide === 0)
          dispatch({
            type: ACTION_TYPES.SET_ANIMATION_FRAME,
            celiaAnimationFrame: 'front',
          })
        break
      }
      default:
        break
    }

    return () => {
      clearInterval(helloIntervalID.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalPosition])
}

export function useClimbingEffect(
  celiaAnimationFrame,
  dispatch,
  celiaVerticalPosition,
  climbLadderIntervalRef
) {
  useEffect(() => {
    const climbAnimation = () => {
      const newFramePosition =
        celiaAnimationFrame === 'backRightSide'
          ? 'backLeftSide'
          : 'backRightSide'
      dispatch({
        type: ACTION_TYPES.SET_ANIMATION_FRAME,
        celiaAnimationFrame: newFramePosition,
      })
    }

    if (celiaVerticalPosition === 'transitioning') {
      climbLadderIntervalRef.current = setInterval(() => climbAnimation(), 400)
    }

    return () => {
      clearInterval(climbLadderIntervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celiaVerticalPosition, celiaAnimationFrame])
}

export function useScrollEffect(
  currentDirection,
  windowGlobal,
  dispatch,
  activeSlide,
  previousScroll
) {
  useEffect(() => {
    const animationGoTo = direction => {
      if (currentDirection.current === direction) return
      currentDirection.current = direction
      dispatch({
        type: ACTION_TYPES.SET_CELIA_VERTICAL_DIRECTION,
        celiaVerticalDirection: direction,
      })
    }

    windowGlobal.onscroll = () => {
      /* Early return if we are positioned below 
      the middle section or we are not in the initial slide */
      if (windowGlobal.scrollY > 500 || activeSlide !== 0) return
      const isGoingBottom = previousScroll < windowGlobal.scrollY
      animationGoTo(isGoingBottom ? 'toBottom' : 'toTop')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowGlobal, activeSlide, previousScroll])
}

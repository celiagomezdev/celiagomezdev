import React, { useRef, useContext } from 'react'
import styles from './celia-animation.module.scss'
import celiaFramesImage from '../static/img/celia-frames.png'
import { Context } from '../context'
import {
  useFirstRenderEffect,
  useAnimationFrameEffect,
  useTransitionEffect,
  useVerticalDirectionEffect,
  useVerticalPositionEffect,
  useClimbingEffect,
  useScrollEffect,
} from '../hooks/celia-animation-hooks'

export default function CeliaAnimation() {
  const [state, dispatch] = useContext(Context)

  const {
    celiaAnimationFrame,
    celiaVerticalPosition,
    celiaVerticalDirection,
    animationMaxHeight,
    activeSlide,
  } = state

  const celiaAnimationRef = useRef()
  const celiaFramesRef = useRef()
  const climbLadderIntervalRef = useRef()
  const currentDirection = useRef()
  const currentPosition = useRef()
  const helloIntervalID = useRef(null)

  const windowGlobal = typeof window !== 'undefined' && window
  const previousScroll = windowGlobal.scrollY

  const celiaFramesPosition = {
    front: 4,
    frontHello: -10.65,
    backOne: -27.4,
    backRightSide: -42.5,
    backLeftSide: -58.7,
    backTwo: -74.5,
    backThree: -90.3,
    sitOne: -109.1,
    sitTwo: -128,
  }

  useFirstRenderEffect(dispatch)

  useTransitionEffect(
    celiaAnimationRef,
    currentPosition,
    celiaVerticalDirection,
    dispatch
  )

  useAnimationFrameEffect(
    celiaAnimationFrame,
    celiaFramesRef,
    celiaFramesPosition
  )

  useVerticalDirectionEffect(
    celiaVerticalDirection,
    windowGlobal,
    celiaAnimationRef,
    animationMaxHeight
  )

  useVerticalPositionEffect(
    celiaVerticalPosition,
    helloIntervalID,
    dispatch,
    activeSlide
  )

  useClimbingEffect(
    celiaAnimationFrame,
    dispatch,
    celiaVerticalPosition,
    climbLadderIntervalRef
  )

  useScrollEffect(
    currentDirection,
    windowGlobal,
    dispatch,
    activeSlide,
    previousScroll
  )

  return (
    <div
      id={styles.celiaAnimation}
      className="content grid"
      ref={celiaAnimationRef}
    >
      <div className={styles.celiaContainer}>
        <div className={styles.celia} ref={celiaFramesRef}>
          <img src={celiaFramesImage} alt="Celia Animation"></img>
        </div>
      </div>
    </div>
  )
}

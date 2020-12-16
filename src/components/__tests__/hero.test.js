import React from 'react'
import { render } from '@testing-library/react'
import Hero from '../hero'

describe('Hero', () => {
  it('renders correctly', () => {
    render(<Hero />)
  })
})

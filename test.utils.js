import React from 'react'
import { render } from '@testing-library/react'
import { Store } from './src/context/index'

const StoreProvider = ({ children }) => {
  return (
    <Store>
      {children}
    </Store>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: StoreProvider, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { 
  customRender as render
}

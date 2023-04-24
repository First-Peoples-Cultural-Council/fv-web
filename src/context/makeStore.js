import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export default function makeStore(reducer, initialState) {
  const StoreContext = createContext()
  const DispatchContext = createContext()

  function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      <DispatchContext.Provider value={dispatch}>
        <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
      </DispatchContext.Provider>
    )
  }

  // PROPTYPES
  const { node } = PropTypes

  StoreProvider.propTypes = {
    children: node,
  }

  function useStore() {
    return useContext(StoreContext)
  }

  function useDispatch() {
    return useContext(DispatchContext)
  }

  return [StoreProvider, useStore, useDispatch]
}

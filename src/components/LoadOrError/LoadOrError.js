import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadingPresentation from 'components/Loading/LoadingPresentation'
import ErrorHandler from 'components/ErrorHandler'

function LoadOrError({ children, queryReturn, height = 'h-screen' }) {
  if (queryReturn?.status === 'pending') {
    return <LoadingPresentation height={height} />
  }

  if (queryReturn?.status === 'error') {
    return (
      <ErrorHandler.Container
        error={{
          status: queryReturn?.error?.response?.status,
          statusText: queryReturn?.error?.message,
        }}
      />
    )
  }
  return children
}
// PROPTYPES
const { object, node, string } = PropTypes
LoadOrError.propTypes = {
  children: node,
  queryReturn: object,
  height: string,
}

export default LoadOrError

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadingPresentation from 'components/Loading/LoadingPresentation'
import ErrorHandler from 'components/ErrorHandler'

function LoadOrError({ children, queryResponse, height = 'h-screen' }) {
  if (queryResponse?.status === 'pending') {
    return <LoadingPresentation height={height} />
  }

  if (queryResponse?.status === 'error') {
    return (
      <ErrorHandler.Container
        error={{
          status: queryResponse?.error?.response?.status,
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
  queryResponse: object,
  height: string,
}

export default LoadOrError

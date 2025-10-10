import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadingPresentation from 'components/Loading/LoadingPresentation'
import ErrorHandler from 'components/ErrorHandler'

function LoadOrError({
  children,
  queryResponse,
  height = 'h-screen',
  bypass = false,
}) {
  if (bypass) {
    return children
  }

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
const { bool, object, node, string } = PropTypes
LoadOrError.propTypes = {
  children: node,
  queryResponse: object,
  height: string,
  bypass: bool,
}

export default LoadOrError

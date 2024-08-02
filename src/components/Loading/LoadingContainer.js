import React from 'react'
import PropTypes from 'prop-types'
import LoadingPresentation from 'components/Loading/LoadingPresentation'

function LoadingContainer({ children, isLoading, height = 'h-screen' }) {
  return isLoading ? <LoadingPresentation height={height} /> : children
}
// PROPTYPES
const { bool, node, string } = PropTypes
LoadingContainer.propTypes = {
  children: node,
  isLoading: bool,
  height: string,
}

export default LoadingContainer

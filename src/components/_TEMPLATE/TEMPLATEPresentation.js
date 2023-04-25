import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function TEMPLATEPresentation({ exampleProp }) {
  return (
    <div data-testid="TEMPLATEPresentation">
      TEMPLATEPresentation: {exampleProp}
    </div>
  )
}
// PROPTYPES
const { string } = PropTypes
TEMPLATEPresentation.propTypes = {
  exampleProp: string,
}

export default TEMPLATEPresentation

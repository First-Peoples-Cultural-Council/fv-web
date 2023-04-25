import React from 'react'
// import PropTypes from 'prop-types'

// FPCC
import TEMPLATEPresentation from 'components/_TEMPLATE/TEMPLATEPresentation'
import TEMPLATEData from 'components/_TEMPLATE/TEMPLATEData'

function TEMPLATEContainer() {
  const { exampleOutput } = TEMPLATEData({ exampleInput: 'passedInToData' })
  return <TEMPLATEPresentation exampleProp={exampleOutput} />
}
// PROPTYPES
// const { string } = PropTypes
TEMPLATEContainer.propTypes = {
  //   something: string,
}

export default TEMPLATEContainer

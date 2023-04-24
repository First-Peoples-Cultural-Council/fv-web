import React from 'react'
import PropTypes from 'prop-types'

function AppPresentation({ exampleProp }) {
  return <div className="App">AppPresentation: {exampleProp}</div>
}
// PROPTYPES
const { string } = PropTypes
AppPresentation.propTypes = {
  exampleProp: string,
}

export default AppPresentation

import React from 'react'
import PropTypes from 'prop-types'

function Minus({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M983.28 660H216.72c-33.121 0-60-26.879-60-60s26.879-60 60-60h766.8c33.121 0 60 26.879 60 60s-27.121 60-60.238 60z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Minus.propTypes = {
  styling: string,
}

export default Minus

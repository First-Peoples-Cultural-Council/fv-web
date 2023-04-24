import React from 'react'
import PropTypes from 'prop-types'

function Add({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M600 144c-33.137 0-60 26.863-60 60v336H204c-33.137 0-60 26.863-60 60s26.863 60 60 60h336v336c0 33.137 26.863 60 60 60s60-26.863 60-60V660h336c33.137 0 60-26.863 60-60s-26.863-60-60-60H660V204c0-33.137-26.863-60-60-60z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Add.propTypes = {
  styling: string,
}

export default Add

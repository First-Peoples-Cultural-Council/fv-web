import React from 'react'
import PropTypes from 'prop-types'

function Mute({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styling}
    >
      <title>Mute</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 9v6h4l5 5V4l-5 5H7z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Mute.propTypes = {
  styling: string,
}

export default Mute

import React from 'react'
import PropTypes from 'prop-types'

function Devices({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
      viewBox="0 0 30 21"
    >
      <path d="M5 3h22.5V.5H5A2.507 2.507 0 002.5 3v13.75H0v3.75h17.5v-3.75H5V3zm23.75 2.5h-7.5c-.688 0-1.25.563-1.25 1.25v12.5c0 .688.563 1.25 1.25 1.25h7.5c.688 0 1.25-.563 1.25-1.25V6.75c0-.688-.563-1.25-1.25-1.25zM27.5 16.75h-5V8h5v8.75z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Devices.propTypes = {
  styling: string,
}

export default Devices

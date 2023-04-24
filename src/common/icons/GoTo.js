import React from 'react'
import PropTypes from 'prop-types'

function GoTo({ styling }) {
  return (
    <svg
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <title>Link to</title>
      <path d="M632.4 820.8c-34.801 34.801-80.398 52.801-126 52.801-45.602 0-91.199-18-126-52.801-69.602-69.602-69.602-182.4 0-252l312-312c-57.602-24-120-37.199-186-37.199-262.8-1.203-476.4 212.4-476.4 474s213.6 476.4 476.4 476.4c262.8 0 476.4-213.6 476.4-476.4 0-66-13.199-128.4-37.199-186z" />
      <path d="M1110 30H802.8c-32.398 0-60 26.398-60 60s26.398 60 60 60h164.4l-504 501.6c-22.801 22.801-22.801 61.199 0 84 12 12 26.398 18 42 18s30-6 42-18L1050 232.8v164.4c0 32.398 26.398 60 60 60s60-26.398 60-60V90c0-33.602-26.398-60-60-60z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
GoTo.propTypes = {
  styling: string,
}

export default GoTo

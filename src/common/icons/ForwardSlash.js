import React from 'react'
import PropTypes from 'prop-types'

function ForwardSlash({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>ForwardSlash</title>
      <path
        d="M711.73 100.77c11.707-32.16 47.359-48.711 79.484-37.02 32.191 11.719 48.832 47.195 37.094 79.449l-347.97 956.03c-11.707 32.16-47.355 48.711-79.484 37.02-32.191-11.719-48.832-47.195-37.09-79.449z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ForwardSlash.propTypes = {
  styling: string,
}

export default ForwardSlash

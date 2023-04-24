import React from 'react'
import PropTypes from 'prop-types'

function MapLocation({ styling }) {
  return (
    <svg
      className={styling}
      width="1200pt"
      height="1200pt"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M600 265.78c97.766 0 177.02 79.262 177.02 177.02 0 97.766-79.246 177.02-177.02 177.02S422.98 540.558 422.98 442.8c0-97.766 79.258-177.02 177.02-177.02zm23.531 903.29C1322.221 403.41 961.101 20.57 600 20.57s-722.21 382.84-23.543 1148.5c6.254 6.863 14.258 10.379 23.543 10.379 9.277.016 17.293-3.5 23.531-10.367z"
        fillRule="evenodd"
      />
    </svg>
  )
}

// PROPTYPES
const { string } = PropTypes

MapLocation.propTypes = {
  styling: string,
}

export default MapLocation

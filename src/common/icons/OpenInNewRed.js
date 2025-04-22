import React from 'react'
import PropTypes from 'prop-types'

function OpenInNewRed({ styling }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.681 1.8v1.562H5.068c-1.137.001-1.705.574-1.705 1.719v13.851c0 1.137.568 1.706 1.705 1.706h13.851c1.145 0 1.718-.569 1.719-1.706v-7.12H22.2v7.12c.002 2.179-1.092 3.268-3.28 3.268H5.067c-2.179 0-3.268-1.09-3.268-3.268V5.081c0-2.189 1.09-3.282 3.268-3.281h6.613zm2.526 1.562V1.8H22.2v7.759h-1.562v-4.94L7.873 16.64 6.8 15.501 19.701 3.363h-5.494z"
        fill="#9D2E24"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
OpenInNewRed.propTypes = {
  styling: string,
}

export default OpenInNewRed

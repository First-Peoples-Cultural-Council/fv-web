import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Close
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Close({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Close.propTypes = {
  styling: string,
}

export default Close

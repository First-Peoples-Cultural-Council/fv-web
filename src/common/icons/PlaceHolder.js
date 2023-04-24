import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary PlaceHolder
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function PlaceHolder({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styling}
    >
      <rect width="100" height="100" rx="10" ry="10" fill="none" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
PlaceHolder.propTypes = {
  styling: string,
}

export default PlaceHolder

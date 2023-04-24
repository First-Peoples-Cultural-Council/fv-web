import React from 'react'
import PropTypes from 'prop-types'

function ArrowDivider({ styling }) {
  return (
    <svg
      className={styling}
      viewBox="0 0 22 80"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 -2L20 40L0 82"
        vectorEffect="non-scaling-stroke"
        stroke="currentcolor"
        strokeLinejoin="round"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ArrowDivider.propTypes = {
  styling: string,
}

export default ArrowDivider

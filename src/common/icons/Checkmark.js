import React from 'react'
import PropTypes from 'prop-types'

function Checkmark({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path
        d="M169.37 594.59C97.3 518.914-18.02 634.231 57.66 706.3c93.695 97.297 187.39 198.2 284.68 291.89 43.242 39.641 75.676 39.641 115.32 0l688.29-684.68c72.07-75.676-39.641-190.99-115.32-115.32L403.6 825.22z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Checkmark.propTypes = {
  styling: string,
}

export default Checkmark

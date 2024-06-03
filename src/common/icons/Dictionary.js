import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Dictionary
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Dictionary({ styling }) {
  return (
    <svg
      width="1200pt"
      height="1200pt"
      version="1.1"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <path d="m325 100c-68.816 0-125 56.184-125 125 0.007812 256.73 0 520.51 0 775 0 54.969 45.031 100 100 100h600c54.969 0 100-45.031 100-100-0.35156-255.07 0-517.74 0-775 0-68.816-56.184-125-125-125zm200 200c82.547 0 150 67.453 150 150 0 32.297-10.316 62.277-27.832 86.816l170.51 170.51c9.7617 9.7617 9.7617 25.59 0 35.352s-25.59 9.7617-35.352 0l-170.51-170.51c-24.539 17.516-54.52 27.832-86.816 27.832-82.547 0-150-67.453-150-150s67.453-150 150-150zm-225 650h600c28.133 0 50 21.867 50 50s-21.867 50-50 50h-600c-28.133 0-50-21.867-50-50s21.867-50 50-50z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Dictionary.propTypes = {
  styling: string,
}

export default Dictionary

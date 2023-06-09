import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Learn
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Learn({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styling}
    >
      <path d="M20,18c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v10c0,1.1,0.9,2,2,2H0v2h24v-2H20z M4,6h16v10H4V6z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Learn.propTypes = {
  styling: string,
}

export default Learn

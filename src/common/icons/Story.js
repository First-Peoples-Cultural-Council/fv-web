import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Story
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Story({ styling }) {
  return (
    <svg
      data-testid="Story"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styling}
    >
      <path d="M12.52,5.59c0,0,4.44-2.95,9.44-2.95v16.69c0,0-6.75-0.56-9.44,2.13V5.59z" />
      <path d="M11.49,5.59c0,0-4.44-2.95-9.44-2.95v16.69c0,0,6.75-0.56,9.44,2.13V5.59z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Story.propTypes = {
  styling: string,
}

export default Story

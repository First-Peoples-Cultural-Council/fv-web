import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Song
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Song({ styling }) {
  return (
    <svg
      data-testid="Song"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styling}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Song.propTypes = {
  styling: string,
}

export default Song

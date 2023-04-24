import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Phrase
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Phrase({ styling }) {
  return (
    <svg
      data-testid="Phrase"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <path d="M48 38.43c0-2.488-.378-4.889-1.082-7.147C43.876 21.519 34.765 14.43 24 14.43a23.882 23.882 0 00-13.039 3.85C4.364 22.556 0 29.983 0 38.43c0 12.726 9.904 23.137 22.425 23.948-2.566 9.357-8.023 17.454-15.305 23.191C29.868 84.521 48 65.074 48 41.237c0-.532-.012-1.062-.029-1.591.019-.401.029-.807.029-1.216zM100 38.43c0-2.488-.379-4.889-1.082-7.147C95.877 21.519 86.766 14.43 76 14.43a23.882 23.882 0 00-13.039 3.85C56.365 22.556 52 29.983 52 38.43c0 12.726 9.904 23.137 22.426 23.948-2.566 9.357-8.023 17.454-15.305 23.191C81.869 84.521 100 65.074 100 41.237c0-.532-.012-1.062-.029-1.591.019-.401.029-.807.029-1.216z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Phrase.propTypes = {
  styling: string,
}

export default Phrase

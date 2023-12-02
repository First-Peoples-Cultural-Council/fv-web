import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary PhraseScrambler
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function PhraseScrambler({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0 0 100 100"
      className={styling}
    >
      <title>PhraseScrambler</title>
      <path d="M12.1 35.1h9c5.7 0 8.4 3 12.1 10.7 2-4.6 4.5-9.8 8-14.6-.4-.6-.9-1.2-1.4-1.8-4.9-5.7-11.1-8.6-18.7-8.6h-9C8.2 20.9 5 24.1 5 28s3.2 7.1 7.1 7.1zM76.8 68.3c-8.2 0-14.1-2.1-18.6-6.7-2.1-2.2-3.9-4.8-5.4-7.7-.3.8-.7 1.5-1 2.3-1.9 4.2-3.8 8.5-6.3 12.5 6.2 7.8 15.6 13.9 31.3 13.9v11.1L95 75.5 76.8 57.3v11z" />
      <path d="M58.2 38.4c4.5-4.6 10.4-6.7 18.6-6.7v11.1L95 24.5 76.8 6.3v11.1c-27.2 0-35.3 18.3-41.2 31.7-5.1 11.5-7.7 15.8-14.4 15.8h-9c-4 0-7.2 3.2-7.2 7.1s3.2 7.1 7.1 7.1h9c7.5 0 13.8-2.9 18.7-8.6 3.8-4.5 6.3-10.2 8.8-15.7 2.7-5.9 5.4-12.1 9.6-16.4z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
PhraseScrambler.propTypes = {
  styling: string,
}

export default PhraseScrambler

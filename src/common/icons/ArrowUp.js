import React from 'react'
import PropTypes from 'prop-types'

function ArrowUp({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5.0 -10.0 110.0 135.0"
      className={styling}
    >
      <path
        d="M51.539 8.629a4.12 4.12 0 00-1.54-.297c-.6 0-1.171.129-1.687.355-.035.02-.074.036-.113.055-.414.2-.805.469-1.144.813-.051.05-.102.101-.149.152L21.937 36.758a4.168 4.168 0 006.125 5.652l17.77-19.254V87.5c0 2.301 1.867 4.168 4.168 4.168s4.168-1.867 4.168-4.168V23.156l17.77 19.254a4.168 4.168 0 006.125-5.652L53.094 9.707a5.385 5.385 0 00-.148-.152 4.113 4.113 0 00-1.407-.926z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ArrowUp.propTypes = {
  styling: string,
}

export default ArrowUp

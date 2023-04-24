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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <path d="M18.496 89.886c-3.441-2.637-5.638-6.944-5.638-11.514V21.628C12.858 13.592 19.438 7 27.473 7h57.673c1.105 0 1.996.892 1.996 1.996v65.897a1.993 1.993 0 01-1.996 1.997H32.433c-5.8 0-10.547 4.633-10.748 10.384a10.493 10.493 0 005.788 1.72H83.15v-7.307c0-2.637 3.993-2.637 3.993 0v9.317A1.993 1.993 0 0185.146 93H27.473c-3.377 0-6.491-1.168-8.977-3.114zm23.644-78.88H28.302v45.253c8.1-9.254 5.826-9.317 13.838-.05V11.006z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Dictionary.propTypes = {
  styling: string,
}

export default Dictionary

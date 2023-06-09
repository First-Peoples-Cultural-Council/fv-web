import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Parachute
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Parachute({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <title>Parachute</title>
      <path d="M50 2.5c-21.7 0-39.3 14.4-39.3 32.1 0 .4.2.9.5 1.2L32.1 58c.2-.2.5-.4.8-.6.8-.5 1.7-.8 2.6-.9L14.6 34.2c.4-1.8 4.3-4.1 10.6-4.1 6.5 0 10.2 2.5 10.7 4.4l5.9 19v-.1c0-2 .7-3.9 1.9-5.3l-4-13c-.1-.4-.2-1 0-1.4 1-1.7 4.7-3.5 10.4-3.5 5.4 0 9.2 1.8 10.3 3.4.3.4.2 1 .1 1.5l-4 13c1.2 1.4 1.9 3.3 1.9 5.3v.1l5.9-19c.6-2.2 4.2-4.4 10.8-4.4 6.2 0 10.1 2.3 10.5 4.1l-21 22.3c.9 0 1.8.4 2.6.9.3.2.5.4.8.6l20.9-22.2c.3-.3.5-.8.5-1.2C89.3 16.9 71.7 2.5 50 2.5zM62.5 60.6L60 64.3c-4.9-4.5-5.9-4.5-6.7-4.5h-6.5c-.7 0-1.7 0-6.7 4.5l-2.5-3.7c-.7-1-2-1.2-2.9-.6-1 .7-1.2 2-.6 2.9l3.4 5c.5.7 1.2 1.2 2.1 1.3.8.1 1.7-.2 2.3-.8 1.5-1.4 2.7-2.5 3.6-3.2v10.2L43 94.7c-.2 1.3.8 2.6 2.1 2.7h.3c1.2 0 2.3-.9 2.4-2.1L50 77.7l2.2 17.6c.2 1.2 1.2 2.1 2.4 2.1h.3c1.3-.2 2.3-1.4 2.1-2.7l-2.5-19.3V65.3c.9.7 2 1.7 3.6 3.2.5.5 1.2.8 2 .8h.3c.8-.1 1.6-.6 2.1-1.3l3.4-5c.7-1 .4-2.3-.6-2.9-.9-.8-2.2-.5-2.8.5z" />
      <circle cx={50} cy={53.4} r={5.1} />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Parachute.propTypes = {
  styling: string,
}

export default Parachute

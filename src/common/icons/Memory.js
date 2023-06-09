import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Memory
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Memory({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <title>Memory</title>
      <path d="M5273.1 2400.1v-2c0-2.8-5-4-9.7-4s-9.7 1.3-9.7 4v2c0 1.8.7 3.6 2 4.9l5 4.9c.3.3.4.6.4 1v6.4c0 .4.2.7.6.8l2.9.9c.5.1 1-.2 1-.8v-7.2c0-.4.2-.7.4-1l5.1-5c1.3-1.3 2-3.1 2-4.9zm-9.7-.1c-4.8 0-7.4-1.3-7.5-1.8.1-.5 2.7-1.8 7.5-1.8s7.3 1.3 7.5 1.8c-.2.5-2.7 1.8-7.5 1.8z" />
      <path d="M5268.4 2410.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1h-4.3zM5272.7 2413.7h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1zM5272.7 2417h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1 0-.5-.4-1-1-1z" />
      <g>
        <path d="M91.1 55.9l-8-12.3c-.4-.7-.6-1.6-.7-2.4C81.1 27 70.6 15.4 56.7 12.9c1.7 3.7 2.6 7.7 2.6 12 0 15.8-12.9 28.7-28.7 28.7-3.7 0-7.3-.7-10.5-2 1.8 7.6 6 14.6 11.8 19.6.9.8 1.5 1.9 1.5 3.1v18.1c0 1.5 1.1 2.6 2.5 2.8l27.2 2.4c1.6.1 3-1.1 3-2.7v-13c0-.8.7-1.5 1.5-1.5h9.6c2.9 0 5.3-2.3 5.3-5.3V62.3c0-.6.5-1 1.1-1h4.6c2.8 0 4.5-3.1 2.9-5.4z" />
        <path d="M52.9 24.8c0-12.3-10-22.3-22.3-22.3S8.3 12.5 8.3 24.8s10 22.3 22.3 22.3 22.3-10 22.3-22.3zm-25.5 0V13.6c0-1.7 1.4-3.2 3.2-3.2 1.7 0 3.2 1.4 3.2 3.2v8.1h6c1.7 0 3.2 1.4 3.2 3.2 0 1.7-1.4 3.2-3.2 3.2h-9.1c-1.8-.1-3.3-1.5-3.3-3.3z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Memory.propTypes = {
  styling: string,
}

export default Memory

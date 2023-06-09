import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary WordSearch
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function WordSearch({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <title>WordSearch</title>
      <path d="M5273.1 2400.1v-2c0-2.8-5-4-9.7-4s-9.7 1.3-9.7 4v2c0 1.8.7 3.6 2 4.9l5 4.9c.3.3.4.6.4 1v6.4c0 .4.2.7.6.8l2.9.9c.5.1 1-.2 1-.8v-7.2c0-.4.2-.7.4-1l5.1-5c1.3-1.3 2-3.1 2-4.9zm-9.7-.1c-4.8 0-7.4-1.3-7.5-1.8.1-.5 2.7-1.8 7.5-1.8s7.3 1.3 7.5 1.8c-.2.5-2.7 1.8-7.5 1.8z" />
      <path d="M5268.4 2410.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1h-4.3zM5272.7 2413.7h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1zM5272.7 2417h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1 0-.5-.4-1-1-1z" />
      <g>
        <path d="M83.2 35.8c-7.9 0-14.3 6.4-14.3 14.3 0 4.9 2.5 9.2 6.2 11.8L71.5 70l-13.6.5s-7.1-11.9-11-18.4c-5.4-8.8-19.5-18.3-30-9.2C6.5 52 3.3 74.6 2.5 90.6c-.1 2.1 1.6 3.9 3.7 3.9H38c2 0 3.7-1.7 3.7-3.7V74.9l4.8 8c.8 1.4 2.1 2.5 3.5 3.2 1.1.5 2.4.8 3.7.8l21.8-.8c4.5-.1 8-3.9 7.8-8.4-.1-3.6-2.7-6.6-6-7.5l2.8-6.2c1 .2 2.1.4 3.3.4 7.9 0 14.3-6.4 14.3-14.3s-6.6-14.3-14.5-14.3zm0 23.3c-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9 8.9 4 8.9 8.9-4 8.9-8.9 8.9z" />
        <ellipse
          transform="rotate(-64.962 45.65 23.2)"
          cx={45.7}
          cy={23.2}
          rx={17.7}
          ry={17.7}
        />
        <path d="M85.7 44.5c-1.5-.7-3.1-.7-4.7-.1-1 .4-1.5 1.5-1.1 2.6.4 1 1.5 1.5 2.6 1.1.5-.2 1.1-.2 1.6 0s.9.6 1.1 1.2c.3.8 1.1 1.3 1.9 1.3.2 0 .5 0 .7-.1 1-.4 1.5-1.5 1.1-2.6-.6-1.5-1.7-2.7-3.2-3.4z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
WordSearch.propTypes = {
  styling: string,
}

export default WordSearch

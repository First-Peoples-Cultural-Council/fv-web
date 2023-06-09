import React from 'react'
import PropTypes from 'prop-types'

function Generations({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="-205 207 100 100"
      className={styling}
    >
      <switch>
        <g>
          <path d="M-175.9 271.2c-4.3 1.1-6.4 5.1-6 11.1l3.3-.2c-.2-2.5.1-6.8 3.5-7.6 11.2-2.8 14.9-6.7 16.1-9.2 1.1.3 2.4.5 3.7.5h.4c1.5 0 2.8-.2 4.1-.6 1.2 2.4 4.8 6.4 16.2 9.3 3.5.9 3.7 5.2 3.5 7.7l3.3.2c.4-6-1.8-10-6-11.1-10.8-2.7-13.4-6.1-14-7.5.8-.5 1.5-1.2 2.1-1.9 5.1-5.7 4.2-15.5 4.1-16.4-.5-11.2-8.7-13.9-13.5-13.7-4.8-.2-13 2.5-13.5 13.7-.1.9-.9 10.7 4.1 16.4.7.8 1.6 1.5 2.5 2.1-.8 1.4-3.7 4.6-13.9 7.2zm10.6-25.5v-.1c.5-9.8 7.7-10.6 9.8-10.6h.4c1.6-.1 9.7.1 10.2 10.6v.1c0 .1.9 9.1-3.3 13.9-1.7 1.9-3.9 2.8-6.9 2.9h-.1-.1c-2.9 0-5.2-1-6.9-2.9-4-4.7-3.1-13.8-3.1-13.9zm44.2 17c3.8-4.3 3.2-11.5 3.1-12.2-.4-8.5-6.6-10.5-10.3-10.4-3.7-.1-9.9 1.9-10.3 10.4-.1.8-.7 8 3.1 12.2.5.5 1 1 1.5 1.4-.4.5-1.2 1.3-2.6 2.1l1.6 2.9c2.3-1.3 3.5-2.6 4.1-3.7.8.2 1.6.3 2.4.3h.4c1 0 1.9-.2 2.7-.4 1.1 1.9 4 4.7 11.9 6.6 2.2.6 2.3 3.4 2.2 5.1l3.3.2c.3-4.6-1.4-7.7-4.7-8.6-7-1.7-9.1-3.9-9.7-4.9.5-.1.9-.5 1.3-1zm-7.2-.3c-2.1 0-3.6-.6-4.7-1.9-2.9-3.3-2.3-9.7-2.3-9.7v-.1c.3-6.8 5.2-7.3 6.7-7.3H-128.3c1.1 0 6.6.1 6.9 7.3v.1c0 .1.6 6.4-2.3 9.7-1 1.3-2.6 1.9-4.6 1.9zm-60.6.4c.4.5.8.8 1.3 1.2-.6 1-2.8 3.1-9.7 4.9-3.3.8-5 4-4.7 8.5l3.3-.2c-.1-1.7 0-4.5 2.2-5.1 8-2 10.9-4.7 11.9-6.6.8.2 1.7.4 2.7.4h.4c.9 0 1.7-.1 2.4-.3.6 1.1 1.8 2.4 4.1 3.7l1.6-2.9c-1.5-.8-2.3-1.6-2.6-2.1.5-.4 1.1-.8 1.5-1.4 3.8-4.3 3.2-11.5 3.1-12.2-.4-8.5-6.6-10.5-10.3-10.4-3.7-.1-9.9 1.9-10.3 10.4-.1.6-.7 7.8 3.1 12.1zm.2-12v-.1c.3-6.8 5.2-7.3 6.7-7.3H-181.7c1.1 0 6.6.1 6.9 7.3v.1c0 .1.6 6.4-2.3 9.7-1.1 1.3-2.7 1.9-4.7 1.9s-3.5-.6-4.7-1.9c-2.8-3.2-2.2-9.6-2.2-9.7z" />
        </g>
      </switch>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Generations.propTypes = {
  styling: string,
}

export default Generations

import React from 'react'
import PropTypes from 'prop-types'

function Microphone({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>Microphone</title>
      <g>
        <path d="M600 815.51c112.65 0 204.49-91.836 204.49-205.71V265.72c0-112.65-91.836-204.49-204.49-204.49s-204.49 91.836-204.49 204.49v345.3c0 112.66 91.836 204.5 204.49 204.5z" />
        <path d="M896.33 484.9h-68.57v73.469h31.836v101.63c0 95.512-116.33 210.61-259.59 210.61s-259.59-116.33-259.59-259.59v-52.652h30.613v-73.469h-67.348c-20.816 0-36.734 15.918-36.734 36.734v89.387c0 171.43 129.8 312.25 296.33 330.61v123.67h-108.98c-20.816 0-36.734 15.918-36.734 36.734 0 20.816 15.918 36.734 36.734 36.734h291.43c20.816 0 36.734-15.918 36.734-36.734 0-20.816-15.918-36.734-36.734-36.734h-108.98v-123.67c72.246-7.348 140.82-37.961 197.14-88.164 62.449-56.328 99.184-126.12 99.184-194.7v-137.14c0-20.816-15.918-36.734-36.734-36.734z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Microphone.propTypes = {
  styling: string,
}

export default Microphone

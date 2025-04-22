import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Download
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Download({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>Download</title>
      <path d="M1081.6 890.2c-16.574 0-30.008 13.434-30.008 30.008v159.76c0 16.547-13.465 30.008-30.008 30.008h-843.26c-16.547 0-30.008-13.465-30.008-30.008v-159.76c0-16.574-13.434-30.008-30.008-30.008S88.3 903.634 88.3 920.208v159.76c0 49.645 40.383 90.027 90.027 90.027h843.26c49.645 0 90.027-40.383 90.027-90.027l-.004-159.76c0-16.574-13.434-30.008-30.008-30.008z" />
      <path d="M578.78 892.68c5.856 5.863 13.539 8.793 21.219 8.793s15.363-2.93 21.219-8.793l303.91-303.91c11.723-11.715 11.723-30.719 0-42.434-11.711-11.723-30.727-11.723-42.434 0l-253.05 253.04V59.646c0-16.367-13.273-29.645-29.645-29.645s-29.645 13.277-29.645 29.645v739.73l-253.05-253.04c-11.711-11.723-30.727-11.723-42.434 0-11.723 11.715-11.723 30.719 0 42.434z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Download.propTypes = {
  styling: string,
}

export default Download

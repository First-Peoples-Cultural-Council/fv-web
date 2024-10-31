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
      viewBox="3 0 106 100"
      className={styling}
    >
      <title>Download</title>
      <path d="M86.409 96.705H23.59C14.442 96.705 7 89.262 7 80.114V60.769a3.902 3.902 0 017.804 0v19.345c0 4.845 3.941 8.786 8.785 8.786h62.819c4.845 0 8.786-3.941 8.786-8.786V60.769a3.902 3.902 0 017.806 0v19.345c0 9.148-7.443 16.591-16.591 16.591z" />
      <path d="M81.108 49.644L55.764 74.978a1.08 1.08 0 01-1.527 0L28.892 49.644c-.682-.682-.195-1.852.769-1.852h12.997V15.461c0-1.202.964-2.166 2.166-2.166h20.362c1.191 0 2.166.964 2.166 2.166v32.331h12.987c.964 0 1.452 1.17.769 1.852z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Download.propTypes = {
  styling: string,
}

export default Download

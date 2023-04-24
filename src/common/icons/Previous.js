import React from 'react'
import PropTypes from 'prop-types'

function Previous({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path
        d="M246.15 507.69h861.54c123.08 0 123.08 184.62 0 184.62H246.15L523.07 1000c61.539 61.539-61.539 184.62-123.08 92.309L30.76 661.539c-30.77-30.77-30.77-92.309 0-123.08l369.23-430.77c61.539-92.309 184.62 30.77 123.08 92.309z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Previous.propTypes = {
  styling: string,
}

export default Previous

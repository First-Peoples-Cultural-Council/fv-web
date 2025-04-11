import React from 'react'
import PropTypes from 'prop-types'

function Image({ styling }) {
  return (
    <svg
      className={styling}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m1023.6 90h-847.22c-80.391 0-146.39 66-146.39 146.39v727.22c0 80.391 66 146.39 146.39 146.39h847.22c80.391 0 146.39-66 146.39-146.39v-727.22c0-80.391-66-146.39-146.39-146.39zm-847.22 76.781h847.22c38.391 0 69.609 31.219 69.609 69.609v350.39l-145.22-144c-25.219-25.219-67.219-25.219-93.609 0l-276 276-123.61-124.78c-25.219-25.219-67.219-25.219-93.609 0l-254.39 255.61v-613.22c0-38.391 31.219-69.609 69.609-69.609z" />
      <path d="m604.78 364.13c0 58.781-48 108-108 108s-108-48-108-108 48-108 108-108 108 48 108 108" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Image.propTypes = {
  styling: string,
}

export default Image

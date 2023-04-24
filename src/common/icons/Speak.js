import React from 'react'
import PropTypes from 'prop-types'

function Speak({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M600 494.12c0 106.94-86.824 194.12-194.12 194.12-106.94 0-194.12-87.176-194.12-194.12 0-106.94 87.176-194.12 194.12-194.12C513.17 300 600 387.176 600 494.12zM776.47 1111.8c0 29.293-23.648 52.941-52.941 52.941H88.239c-28.941 0-52.941-23.648-52.941-52.941 0-204.36 166.24-370.59 370.59-370.59 204.35 0 370.59 166.23 370.59 370.59zM1164.7 158.82v211.77c0 68.117-55.41 123.53-123.53 123.53h-51.883l-162 129.53c-9.527 7.758-21.176 11.641-33.176 11.641-7.766 0-15.531-1.766-22.941-5.293-18.352-8.824-30-27.531-30-47.648v-90c-59.648-8.824-105.88-59.648-105.88-121.77V158.81c0-68.113 55.414-123.53 123.53-123.53h282.35c68.117 0 123.53 55.414 123.53 123.53z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Speak.propTypes = {
  styling: string,
}

export default Speak

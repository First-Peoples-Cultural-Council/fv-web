import React from 'react'
import PropTypes from 'prop-types'

function Next({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path
        d="M953.85 692.31H92.31c-123.08 0-123.08-184.62 0-184.62h861.54L676.93 200c-61.539-61.539 61.539-184.62 123.08-92.309l369.23 430.77c30.77 30.77 30.77 92.309 0 123.08l-369.23 430.77c-61.539 92.309-184.62-30.77-123.08-92.309z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Next.propTypes = {
  styling: string,
}

export default Next

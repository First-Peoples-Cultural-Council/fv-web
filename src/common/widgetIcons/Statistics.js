import React from 'react'
import PropTypes from 'prop-types'

function Statistics({ styling }) {
  return (
    <svg
      className={styling}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M326.92 1130.8V69.3c0-12.746 10.332-23.078 23.078-23.078h173.08c12.742 0 23.074 10.332 23.074 23.078v1061.5c0 12.746-10.332 23.078-23.074 23.078h-173.08c-12.746 0-23.078-10.332-23.078-23.078zM0 1130.8V807.72c0-12.742 10.332-23.074 23.078-23.074h173.07c12.746 0 23.078 10.332 23.078 23.074v323.08c0 12.746-10.332 23.078-23.078 23.078H23.078C10.332 1153.878 0 1143.546 0 1130.8zm653.85 0V623.11c0-12.746 10.332-23.078 23.074-23.078h173.08c12.746 0 23.078 10.332 23.078 23.078v507.69c0 12.746-10.332 23.078-23.078 23.078h-173.08c-12.742 0-23.074-10.332-23.074-23.078zm326.92 0V438.49c0-12.746 10.332-23.078 23.078-23.078h173.07c12.746 0 23.078 10.332 23.078 23.078v692.31c0 12.746-10.332 23.078-23.078 23.078h-173.07c-12.746 0-23.078-10.332-23.078-23.078z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Statistics.propTypes = {
  styling: string,
}

export default Statistics

import React from 'react'
import PropTypes from 'prop-types'

function ForwardArrow({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M1179 520.79L859.54 178.86c-21.445-22.969-60.898-8.305-60.898 22.633v120.46c0 11.148-8.71 20.293-20.195 21.551-351.57 38.473-652.29 272.07-762.88 603.39-21.758 65.09 61.812 114.5 111.56 65.832l2.195-2.207c170.79-167.12 403.62-261.16 646.57-261.16 12.574 0 22.738 9.828 22.738 21.984v114.04c0 30.938 39.457 45.637 60.898 22.668l319.46-341.93c12.04-12.875 12.04-32.457.004-45.332z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ForwardArrow.propTypes = {
  styling: string,
}

export default ForwardArrow

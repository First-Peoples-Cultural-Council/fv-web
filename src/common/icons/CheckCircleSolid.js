import React from 'react'
import PropTypes from 'prop-types'

function CheckCircleSolid({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>Success</title>
      <path d="M600 50a549.984 549.984 0 00-305.56 92.691 549.999 549.999 0 00-233.867 564.61 549.986 549.986 0 00432.13 432.13 549.977 549.977 0 00564.61-233.863 550.009 550.009 0 00-68.399-694.48c-103.14-103.14-243.04-161.09-388.91-161.09zm258 437L561 784a50.024 50.024 0 01-35 14.5 49.984 49.984 0 01-35.5-14.5l-150-150a49.993 49.993 0 01-14.789-35.5A49.99 49.99 0 01340.5 563c9.367-9.316 22.039-14.539 35.25-14.539s25.883 5.223 35.25 14.54l113.5 113.5 261.5-262a50.002 50.002 0 0170.5 0 50.002 50.002 0 0111.855 16.284 50.096 50.096 0 014.465 19.645 50.08 50.08 0 01-3.649 19.81A50.117 50.117 0 01858 487z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
CheckCircleSolid.propTypes = {
  styling: string,
}

export default CheckCircleSolid

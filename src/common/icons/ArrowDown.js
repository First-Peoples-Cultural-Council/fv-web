import React from 'react'
import PropTypes from 'prop-types'

function ArrowDown({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5.0 -10.0 110.0 135.0"
      className={styling}
    >
      <path
        d="M54.168 12.5c0-2.3-1.867-4.168-4.168-4.168s-4.168 1.867-4.168 4.168v64.344L28.062 57.59a4.163 4.163 0 00-5.887-.234 4.167 4.167 0 00-.238 5.886l24.969 27.051c.047.051.098.102.148.153.375.379.805.668 1.266.87a4.256 4.256 0 001.64.352H50a4.166 4.166 0 001.543-.297c.086-.035.172-.07.258-.113.414-.2.804-.469 1.144-.812.05-.051.102-.102.148-.153l24.97-27.05a4.168 4.168 0 00-6.125-5.652l-17.77 19.253z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ArrowDown.propTypes = {
  styling: string,
}

export default ArrowDown

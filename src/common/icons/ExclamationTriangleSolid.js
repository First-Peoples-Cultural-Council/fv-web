import React from 'react'
import PropTypes from 'prop-types'

function ExclamationTriangleSolid({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>Warnings</title>
      <path d="M1072.5 933L734 256.5a149.97 149.97 0 00-55.297-60.285c-23.656-14.586-50.906-22.309-78.703-22.309s-55.039 7.723-78.699 22.309A149.979 149.979 0 00466 256.5L127.5 933a150.049 150.049 0 00-15.637 73.887 150.014 150.014 0 0022.348 72.137 149.96 149.96 0 0054.664 52.105A149.955 149.955 0 00262 1150h676a149.976 149.976 0 0073.129-18.871 149.98 149.98 0 0054.668-52.105 150.096 150.096 0 0022.344-72.137A149.967 149.967 0 001072.5 933zm-437 2.5A52.493 52.493 0 01600 950a50.079 50.079 0 01-19-4 50.003 50.003 0 01-16.5-10.5 50.061 50.061 0 01-10.945-16.273 50.033 50.033 0 010-38.457A50.014 50.014 0 01564.5 864.5 49.937 49.937 0 01581 854a50.056 50.056 0 0128.84-3.012A50 50 0 01635.5 864.5a49.812 49.812 0 0110.945 16.27c2.54 6.09 3.844 12.63 3.844 19.23s-1.305 13.137-3.844 19.227A49.874 49.874 0 01635.5 935.5zM650 750a50.004 50.004 0 01-50 50 50.007 50.007 0 01-35.355-14.645A50.01 50.01 0 01550 750V500a50 50 0 01100 0z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ExclamationTriangleSolid.propTypes = {
  styling: string,
}

export default ExclamationTriangleSolid

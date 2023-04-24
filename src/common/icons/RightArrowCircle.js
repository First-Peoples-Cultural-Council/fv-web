import React from 'react'
import PropTypes from 'prop-types'

function RightArrowCircle({ styling }) {
  return (
    <svg
      className={styling}
      viewBox="200 175 825 825"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="a">
          <path d="M222.14 222.14h755.71v755.71H222.14z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path d="M558.59 224.39c-96.445 11.219-186 59.051-247.61 132.66-95.855 114.36-115.73 272.02-51.57 406.06 37.988 78.93 98.613 139.55 177.34 177.34 134.24 64.363 291.9 44.484 406.26-51.371 84.832-70.859 134.83-178.33 134.83-288.95 0-110.62-49.996-218.09-134.83-288.95-78.73-66.137-184.43-98.219-284.42-86.801zm256.86 348l27.359 27.754-27.359 27.754-112.59 112.59-85.227 84.832V663.13h-265.72V537.16h265.72V374.97l85.227 84.832 112.59 112.59z" />
      </g>
    </svg>
  )
}

// PROPTYPES
const { string } = PropTypes
RightArrowCircle.propTypes = {
  styling: string,
}

export default RightArrowCircle

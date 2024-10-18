import React from 'react'
import PropTypes from 'prop-types'

function Mobile({ styling }) {
  return (
    <svg
      viewBox="0 0 13 20"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <path
        opacity="0.5"
        d="M9.59844 0H2.94194C2.19253 0 1.47389 0.305439 0.943964 0.848947C0.413871 1.39263 0.115747 2.13 0.115234 2.89895V17.1011C0.115747 17.87 0.413871 18.6074 0.943964 19.1511C1.47406 19.6946 2.1927 20 2.94194 20H9.59844C10.3475 20 11.066 19.6946 11.5957 19.1509C12.1255 18.6072 12.4231 17.8698 12.4231 17.1011V2.89895C12.4231 2.13018 12.1255 1.39281 11.5957 0.849123C11.066 0.305614 10.3475 0 9.59844 0ZM1.14089 17.0526V3.78947H11.3974V17.0526H1.14089Z"
        fill="#939598"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Mobile.propTypes = {
  styling: string,
}

export default Mobile

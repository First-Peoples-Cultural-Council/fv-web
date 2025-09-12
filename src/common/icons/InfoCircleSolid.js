import React from 'react'
import PropTypes from 'prop-types'

function InfoCircleSolid({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 450 450"
      stroke="currentColor"
    >
      <path d="M225 0C100.74 0 0 100.74 0 225s100.74 225 225 225 225-100.74 225-225S349.26 0 225 0zm-26 322.12v-103a26 26 0 0152 0v103a26 26 0 01-52 0zm26-157.37a31.25 31.25 0 1131.25-31.25A31.25 31.25 0 01225 164.75z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
InfoCircleSolid.propTypes = {
  styling: string,
}

export default InfoCircleSolid

import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function ErrorMessage({ errors, nameId }) {
  return (
    errors?.[nameId] && (
      <div className="text-red-500">{errors?.[nameId]?.message}</div>
    )
  )
}

// PROPTYPES
const { string, object } = PropTypes
ErrorMessage.propTypes = {
  errors: object, // react-hook-form `useForm` errors object
  nameId: string,
}

export default ErrorMessage

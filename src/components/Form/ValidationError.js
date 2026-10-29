import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'

// FPCC

function ValidationError({ errors, nameId }) {
  return (
    <div
      id="ValidationError"
      data-testid={`${nameId}-error-message`}
      className="text-scarlet-800 text-left text-base mt-2"
    >
      {Array.isArray(errors?.[nameId]) ? (
        errors?.[nameId]?.map(({ message, text }, index) => (
          <div key={index}>{message || text?.message}</div>
        ))
      ) : (
        <ErrorMessage errors={errors} name={nameId} />
      )}
    </div>
  )
}

// PROPTYPES
const { string, object } = PropTypes
ValidationError.propTypes = {
  errors: object, // react-hook-form `useForm` errors object
  nameId: string,
}

export default ValidationError

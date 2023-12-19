import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'

// FPCC

function ValidationError({ errors, nameId }) {
  return (
    errors?.[nameId] && (
      <div className="text-red-500" data-testid="DashboardFormErrorMessage">
        <ErrorMessage errors={errors} name={nameId} />
      </div>
    )
  )
}

// PROPTYPES
const { string, object } = PropTypes
ValidationError.propTypes = {
  errors: object, // react-hook-form `useForm` errors object
  nameId: string,
}

export default ValidationError

import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'

// FPCC

function ValidationError({ errors, nameId }) {
  if (!errors?.[nameId]) return ''
  return Array.isArray(errors?.[nameId]) ? (
    errors?.[nameId]?.map(({ message }, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className="text-red-500"
        data-testid="DashboardFormErrorMessage"
      >
        {message}
      </div>
    ))
  ) : (
    <div className="text-red-500" data-testid="DashboardFormErrorMessage">
      <ErrorMessage errors={errors} name={nameId} />
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

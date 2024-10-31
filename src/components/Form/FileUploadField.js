import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import FieldLabel from 'components/Form/FieldLabel'

function FileUploadField({
  label = '',
  nameId,
  disabled = false,
  register,
  errors,
}) {
  return (
    <Fragment key={`${nameId}_FileUploadField`}>
      <FieldLabel nameId={nameId} text={label} />
      <input
        id={nameId}
        name={nameId}
        {...register(nameId)}
        type="file"
        className={`${
          disabled ? 'opacity-50' : ''
        } block w-full border border-charcoal-200 rounded-lg shadow-sm py-2 px-3 
          focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800 sm:text-sm`}
      />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

const { bool, func, object, string } = PropTypes

FileUploadField.propTypes = {
  label: string,
  nameId: string.isRequired,
  disabled: bool,
  register: func,
  errors: object,
}

export default FileUploadField

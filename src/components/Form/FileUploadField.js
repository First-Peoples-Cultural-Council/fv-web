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
        disabled={disabled}
        className="block w-full border border-charcoal-200 rounded-lg shadow-xs p-3 focus:outline-hidden focus:ring-scarlet-800 focus:border-scarlet-800
            file:mr-5 file:btn-md file:btn-primary hover:file:bg-blumine-800
            disabled:file:bg-charcoal-300 disabled:file:text-charcoal-50"
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

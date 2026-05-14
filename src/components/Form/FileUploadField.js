import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import FieldLabel from 'components/Form/FieldLabel'
import HelpText from 'components/Form/HelpText'

function FileUploadField({
  label = '',
  nameId,
  helpText = '⚠️ The FirstVoices file size limit is 1GB',
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
        className="bg-white block w-full border border-charcoal-200 rounded-lg shadow-xs p-3 focus:outline-hidden focus:ring-blumine-600 focus:border-blumine-600
            file:mr-5 file:btn-md file:btn-secondary hover:file:bg-blumine-100 hover:file:cursor-pointer
            disabled:file:bg-charcoal-300 disabled:file:text-charcoal-50"
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

const { bool, func, object, string } = PropTypes

FileUploadField.propTypes = {
  label: string,
  nameId: string.isRequired,
  helpText: string,
  disabled: bool,
  register: func,
  errors: object,
}

export default FileUploadField

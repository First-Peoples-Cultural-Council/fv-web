import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'

function TextAreaField({
  defaultValue = '',
  errors,
  label = '',
  nameId,
  helpText,
  register,
  rows = 3,
}) {
  return (
    <Fragment key={`${nameId}_TextAreaField`}>
      <label
        htmlFor={nameId}
        className="block text-sm font-medium text-fv-charcoal"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={nameId}
          name={nameId}
          {...register(nameId)}
          rows={rows}
          className="shadow-sm focus:ring-secondary focus:border-secondary mt-1 block w-full border border-gray-300 rounded-lg"
          defaultValue={defaultValue}
        />
      </div>
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { func, number, object, string } = PropTypes
TextAreaField.propTypes = {
  defaultValue: string,
  errors: object,
  helpText: string,
  label: string,
  nameId: string.isRequired,
  register: func,
  rows: number,
}

export default TextAreaField

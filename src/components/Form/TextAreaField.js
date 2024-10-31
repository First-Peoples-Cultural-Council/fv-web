import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

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
      <FieldLabel nameId={nameId} text={label} />
      <textarea
        id={nameId}
        name={nameId}
        {...register(nameId)}
        rows={rows}
        className="shadow-sm focus:ring-scarlet-800 focus:border-scarlet-800 block w-full border border-charcoal-200 rounded-lg"
        defaultValue={defaultValue}
      />
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

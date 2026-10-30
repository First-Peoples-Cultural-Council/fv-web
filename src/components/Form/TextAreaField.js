import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import ValidationIcon from 'components/Form/ValidationIcon'
import FieldLabel from 'components/Form/FieldLabel'

function TextAreaField({
  formState,
  label = '',
  nameId,
  helpText,
  register,
  placeholder = '',
  rows = 3,
}) {
  return (
    <div data-testid={`${nameId}-textarea-field`}>
      <FieldLabel nameId={nameId} text={label} helpText={helpText} />
      <div className="flex items-center justify-start relative">
        <textarea
          id={nameId}
          name={nameId}
          placeholder={placeholder}
          {...register(nameId)}
          rows={rows}
          className={`input-text ${formState?.errors?.[nameId] && 'input-text-error'}`}
        />
        <ValidationIcon nameId={nameId} formState={formState} />
      </div>
      <ValidationError errors={formState?.errors} nameId={nameId} />
    </div>
  )
}
// PROPTYPES
const { func, number, object, string } = PropTypes
TextAreaField.propTypes = {
  formState: object,
  helpText: string,
  label: string,
  placeholder: string,
  nameId: string.isRequired,
  register: func,
  rows: number,
}

export default TextAreaField

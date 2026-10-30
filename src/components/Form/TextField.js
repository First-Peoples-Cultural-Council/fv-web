import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import ValidationIcon from 'components/Form/ValidationIcon'
import FieldLabel from 'components/Form/FieldLabel'

function TextField({
  nameId,
  helpText,
  formState,
  register,
  label = '',
  placeholder = '',
  disabled = false,
  type = 'text',
}) {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  return (
    <div data-testid={`${nameId}-text-field`}>
      <FieldLabel nameId={nameId} text={label} helpText={helpText} />
      <div className="flex items-center justify-start relative">
        <input
          id={nameId}
          name={nameId}
          {...register(nameId)}
          type={type}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`input-text ${formState?.errors?.[nameId] && 'input-text-error'}`}
        />
        <ValidationIcon nameId={nameId} formState={formState} />
      </div>
      <ValidationError errors={formState?.errors} nameId={nameId} />
    </div>
  )
}
// PROPTYPES
const { bool, func, object, string } = PropTypes
TextField.propTypes = {
  disabled: bool,
  formState: object,
  helpText: string,
  label: string,
  nameId: string.isRequired,
  placeholder: string,
  register: func,
  type: string,
}

export default TextField

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import ValidationIcon from 'components/Form/ValidationIcon'
import FieldLabel from 'components/Form/FieldLabel'

function TextField({
  label = '',
  nameId,
  helpText,
  disabled = false,
  formState,
  register,
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
          type="text"
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-lg bg-white px-4 py-2 text-base text-charcoal-900 placeholder:text-charcoal-300 border border-charcoal-300 disabled:border-charcoal-100 disabled:bg-charcoal-50 disabled:text-charcoal-300 focus:outline-hidden focus:ring-blumine-800 focus:border-transparent"
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
  register: func,
}

export default TextField

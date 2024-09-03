import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function TextField({
  label = '',
  nameId,
  helpText,
  disabled = false,
  errors,
  register,
}) {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  return (
    <Fragment key={`${nameId}_TextField`}>
      <FieldLabel nameId={nameId} text={label} />
      <input
        id={nameId}
        name={nameId}
        {...register(nameId)}
        type="text"
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className={`${
          disabled ? 'opacity-50' : ''
        } block w-full border border-gray-300 rounded-lg shadow-sm py-4 px-3 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm`}
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { bool, func, object, string } = PropTypes
TextField.propTypes = {
  disabled: bool,
  errors: object,
  helpText: string,
  label: string,
  nameId: string.isRequired,
  register: func,
}

export default TextField

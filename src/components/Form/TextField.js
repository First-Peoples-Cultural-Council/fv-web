import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'

function TextField({ label, nameId, helpText, disabled, errors, register }) {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  return (
    <Fragment key={`${nameId}_TextField`}>
      <label
        htmlFor={nameId}
        className="block text-sm font-medium text-fv-charcoal"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={nameId}
          name={nameId}
          {...register(nameId)}
          type="text"
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={`${
            disabled ? 'opacity-50' : ''
          } mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm`}
        />
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
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

TextField.defaultProps = {
  disabled: false,
  label: '',
}

export default TextField

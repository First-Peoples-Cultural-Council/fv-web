import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function FieldLabel({ text, helpText, nameId }) {
  return (
    <label
      data-testid={`label-${nameId}`}
      htmlFor={nameId}
      className="block text-charcoal-500 text-base mb-4 space-y-2"
    >
      <div className="font-bold">{text}</div>
      {helpText && <div data-testid={`help-text-${nameId}`}>{helpText}</div>}
    </label>
  )
}

// PROPTYPES
const { string } = PropTypes
FieldLabel.propTypes = {
  text: string,
  helpText: string,
  nameId: string,
}

export default FieldLabel

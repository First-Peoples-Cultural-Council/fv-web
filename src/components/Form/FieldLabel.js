import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function FieldLabel({ text, nameId }) {
  if (!text?.length > 0) return ''
  return (
    <label
      data-testid={`label-${nameId}`}
      htmlFor={nameId}
      className="block text-sm font-medium text-fv-charcoal mb-2"
    >
      {text}
    </label>
  )
}

// PROPTYPES
const { string } = PropTypes
FieldLabel.propTypes = {
  text: string,
  nameId: string,
}

export default FieldLabel

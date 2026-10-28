import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function HelpText({ text }) {
  if (!text?.length > 0) return <div className="h-2" />
  return (
    <div
      data-testid="help-text"
      className="block text-charcoal-500 text-base mb-4 mt-2"
    >
      {text}
    </div>
  )
}

// PROPTYPES
const { node, oneOfType, string } = PropTypes
HelpText.propTypes = {
  text: oneOfType([string, node]),
}

export default HelpText

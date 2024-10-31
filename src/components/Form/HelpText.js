import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function HelpText({ text }) {
  if (!text?.length > 0) return ''
  return (
    <div data-testid="help-text" className="mt-2 text-sm text-charcoal-500">
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

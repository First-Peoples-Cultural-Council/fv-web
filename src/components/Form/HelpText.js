import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function HelpText({ text }) {
  if (!text?.length > 0) return ''
  return (
    <p data-testid="help-text" className="mt-2 text-sm text-fv-charcoal-light">
      {text}
    </p>
  )
}

// PROPTYPES
const { string } = PropTypes
HelpText.propTypes = {
  text: string,
}

export default HelpText

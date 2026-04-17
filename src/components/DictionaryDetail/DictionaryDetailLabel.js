import React from 'react'
import PropTypes from 'prop-types'

function DictionaryDetailLabel({ label }) {
  return (
    <h4
      data-testid="DictionaryDetailLabel"
      className="justify-start text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide mb-2 sm:mb-3"
    >
      {label}
    </h4>
  )
}
// PROPTYPES
const { string } = PropTypes
DictionaryDetailLabel.propTypes = {
  label: string,
}

export default DictionaryDetailLabel

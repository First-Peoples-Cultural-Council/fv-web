import React from 'react'
import PropTypes from 'prop-types'

function Button({ onClickHandler, label, active }) {
  return (
    <button
      data-testid={`${label}-btn`}
      type="button"
      className={`${
        active ? 'bg-gray-100' : ''
      } flex items-center justify-center outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-scarlet-800`}
      onClick={onClickHandler}
    >
      {label}
    </button>
  )
}

// PROPTYPES
const { func, bool, node } = PropTypes
Button.propTypes = {
  onClickHandler: func,
  label: node,
  active: bool,
}

export default Button

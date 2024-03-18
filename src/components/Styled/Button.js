import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function Button({ color, iconName, label, onClick, outlined, testid }) {
  const baseButton =
    'rounded-lg shadow-sm py-2 px-4 inline-flex justify-center items-center text-sm font-medium'
  const containedButton = `${baseButton} bg-${color} border border-transparent text-white hover:opacity-80 active:opacity-100`
  const outlinedButton = `${baseButton} bg-white border border-${color} text-${color} hover:bg-gray-50 active:bg-white`
  const styling = outlined ? containedButton : outlinedButton

  return (
    <button
      data-testid={testid}
      type="button"
      onClick={onClick}
      className={styling}
    >
      {iconName && getIcon(iconName, 'btn-icon')}
      <span>{label}</span>
    </button>
  )
}
// PROPTYPES
const { string, bool, func } = PropTypes
Button.propTypes = {
  color: string,
  outlined: bool,
  iconName: string,
  label: string.isRequired,
  onClick: func,
  testid: string.isRequired,
}

Button.defaultProps = {
  color: 'primary',
  outlined: false,
}

export default Button

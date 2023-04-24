import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from '@headlessui/react'

function TogglePresentation({ accentColor, toggled, toggleCallback, label }) {
  return (
    <Switch.Group>
      <div className="flex items-center">
        {label && <Switch.Label className="mr-4">{label}</Switch.Label>}
        <Switch
          checked={toggled}
          onChange={toggleCallback}
          className={`${
            toggled ? `bg-${accentColor}` : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-${accentColor} focus:ring-offset-2`}
        >
          <span
            className={`${
              toggled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
// PROPTYPES
const { bool, func, string } = PropTypes
TogglePresentation.propTypes = {
  accentColor: string,
  toggled: bool,
  toggleCallback: func,
  label: string,
}

TogglePresentation.defaultProps = {
  accentColor: 'primary',
  toggled: false,
  toggleCallback: () => {},
}
export default TogglePresentation

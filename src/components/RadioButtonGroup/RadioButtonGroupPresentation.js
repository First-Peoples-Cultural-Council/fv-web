import React from 'react'
import PropTypes from 'prop-types'
import { RadioGroup } from '@headlessui/react'

// FPCC

function RadioButtonGroupPresentation({
  accentColor = 'secondary',
  label,
  onChange,
  options,
  value,
}) {
  return (
    <RadioGroup
      data-testid="FormRadioButtonGroupPresentation"
      value={value}
      onChange={onChange}
    >
      <div className="space-y-2">
        {label && (
          <RadioGroup.Label className="text-sm font-medium text-charcoal-900">
            {label}
          </RadioGroup.Label>
        )}
        <div className="flex space-x-8">
          {options.map((option) => (
            <RadioGroup.Option
              key={option?.value}
              value={option?.value}
              className="inline-flex relative cursor-pointer focus:outline-none"
            >
              {({ checked }) => (
                <div className="flex items-center">
                  <span
                    className={`${
                      checked ? `border-${accentColor}` : 'border-charcoal-900'
                    } bg-white h-5 w-5 rounded-full border flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <span
                      className={
                        checked ? `rounded-full bg-${accentColor} w-4 h-4` : ''
                      }
                    />
                  </span>
                  <div className="flex items-center">
                    <RadioGroup.Label
                      as="p"
                      className={`ml-3 font-medium
                              ${
                                checked
                                  ? `text-${accentColor}`
                                  : 'text-charcoal-900'
                              }`}
                    >
                      {option?.label}
                    </RadioGroup.Label>
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </div>
    </RadioGroup>
  )
}
// PROPTYPES
const { array, func, string } = PropTypes
RadioButtonGroupPresentation.propTypes = {
  accentColor: string,
  label: string,
  onChange: func,
  options: array.isRequired,
  value: string,
}

export default RadioButtonGroupPresentation

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Radio, RadioGroup, Field, Label } from '@headlessui/react'

// FPCC

function RadioButtonGroupPresentation({
  accentColor = 'scarlet-800',
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
          <Label className="text-sm font-medium text-charcoal-900">
            {label}
          </Label>
        )}
        <div className="flex space-x-8">
          {options.map((option) => (
            <Field key={option?.value} as={Fragment}>
              <Radio
                value={option?.value}
                className="inline-flex relative cursor-pointer focus:outline-none"
              >
                {({ checked }) => (
                  <div className="flex items-center">
                    <span
                      className={`${
                        checked ? `border-${accentColor}` : 'border-fv-charcoal'
                      } bg-white h-5 w-5 rounded-full border flex items-center justify-center`}
                      aria-hidden="true"
                    >
                      <span
                        className={
                          checked
                            ? `rounded-full bg-${accentColor} w-4 h-4`
                            : ''
                        }
                      />
                    </span>
                    <div className="flex items-center">
                      <Label
                        as="p"
                        className={`ml-3 font-medium
                              ${
                                checked
                                  ? `text-${accentColor}`
                                  : 'text-charcoal-900'
                              }`}
                      >
                        {option?.label}
                      </Label>
                    </div>
                  </div>
                )}
              </Radio>
            </Field>
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

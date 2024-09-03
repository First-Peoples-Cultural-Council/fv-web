import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup } from '@headlessui/react'
import { Controller } from 'react-hook-form'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'

function RadioButtons({
  errors,
  label = '',
  options,
  nameId,
  control,
  helpText,
}) {
  return (
    <Fragment key="FormRadioButtons">
      <Controller
        control={control}
        id={nameId}
        name={nameId}
        render={({ field: { value, onChange } }) => (
          <RadioGroup value={value} onChange={onChange}>
            <div className="space-y-2">
              <RadioGroup.Label className="text-sm font-medium text-fv-charcoal">
                {label}
              </RadioGroup.Label>
              <div className="flex space-x-8">
                {options.map((option) => (
                  <RadioGroup.Option
                    key={option?.value}
                    value={option?.value}
                    className="inline-flex relative cursor-pointer focus:outline-none"
                  >
                    {({ checked, active }) => (
                      <div className="flex items-center">
                        <span
                          className={`${
                            checked
                              ? 'bg-secondary border-transparent'
                              : 'bg-white border-gray-300'
                          } ${
                            active ? 'ring-2 ring-offset-2 ring-secondary' : ''
                          } h-4 w-4 rounded-full border flex items-center justify-center`}
                          aria-hidden="true"
                        >
                          <span className="rounded-full bg-white w-1.5 h-1.5" />
                        </span>
                        <div className="flex items-center">
                          <RadioGroup.Label
                            as="p"
                            className={`ml-3 font-medium
                              ${
                                checked ? 'text-secondary' : 'text-fv-charcoal'
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
        )}
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
RadioButtons.propTypes = {
  errors: object,
  label: string,
  helpText: string,
  options: array.isRequired,
  nameId: string,
  control: object,
}

export default RadioButtons

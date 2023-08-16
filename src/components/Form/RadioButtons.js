import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup } from '@headlessui/react'
import { Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

function RadioButtons({ errors, label, options, nameId, control }) {
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
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {options.map((option) => (
                  <RadioGroup.Option
                    key={option?.value}
                    value={option?.value}
                    className="flex relative cursor-pointer px-4 py-3 focus:outline-none"
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
      <ErrorMessage errors={errors} name={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
RadioButtons.propTypes = {
  errors: object,
  label: string,
  options: array.isRequired,
  nameId: string,
  control: object,
}

RadioButtons.defaultProps = {
  label: '',
}

export default RadioButtons

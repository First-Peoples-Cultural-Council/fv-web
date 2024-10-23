import React, { Fragment, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Combobox, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function Autocomplete({
  control,
  disabled = false,
  placeholder,
  helpText,
  label = '',
  nameId,
  options,
}) {
  const [query, setQuery] = useState('')
  const getCurrentLabel = (currentValue) => {
    const currentOption = options?.find(({ value }) => value === currentValue)
    return currentOption?.label ? currentOption?.label : ''
  }
  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return (
    <Fragment key="FormAutocomplete">
      <FieldLabel nameId={nameId} text={label} />
      <div className="w-full">
        <Controller
          control={control}
          defaultValue=""
          id={nameId}
          name={nameId}
          render={({ field: { value, onChange } }) => (
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <Combobox
                  value={value}
                  disabled={disabled}
                  onChange={(e) => {
                    onChange(e)
                  }}
                  multiple
                >
                  <div className="relative">
                    <div className="relative w-full">
                      <Combobox.Input
                        className={`${
                          disabled ? 'opacity-50' : 'opacity-100'
                        } relative w-full cursor-default block border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-secondary focus:border-secondary`}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={placeholder}
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {getIcon('ChevronUpDown', 'h-5 w-5 fill-current')}
                      </Combobox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery('')}
                    >
                      <Combobox.Options className="focus:outline-none h-32 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
                        {filteredOptions?.length === 0 && query !== '' ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredOptions?.map((option) => (
                            <Combobox.Option
                              key={option?.value}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-secondary text-white'
                                    : 'text-fv-charcoal'
                                }`
                              }
                              value={option?.value}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`inline-flex truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-secondary'
                                      }`}
                                    >
                                      {getIcon(
                                        'Checkmark',
                                        'h-5 w-5 fill-current',
                                      )}
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
              <div className="col-span-6">
                <p className="text-xs">Selected {label}:</p>
                {value
                  ?.map((optionValue) => getCurrentLabel(optionValue))
                  .join(', ')}
              </div>
            </div>
          )}
        />
      </div>
      <HelpText text={helpText} />
    </Fragment>
  )
}
// PROPTYPES
const { any, arrayOf, bool, object, shape, string } = PropTypes
Autocomplete.propTypes = {
  disabled: bool,
  label: string,
  nameId: string.isRequired,
  options: arrayOf(shape({ label: string, value: any })),
  placeholder: string,
  control: object,
  helpText: string,
}

export default Autocomplete

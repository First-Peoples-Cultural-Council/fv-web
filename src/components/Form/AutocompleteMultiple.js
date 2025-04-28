import React, { Fragment, useState } from 'react'
import { Controller } from 'react-hook-form'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  Transition,
} from '@headlessui/react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function AutocompleteMultiple({
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
    <Fragment key="FormAutocompleteMultiple">
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
                      <ComboboxInput
                        className={`${
                          disabled ? 'opacity-50' : 'opacity-100'
                        } relative w-full cursor-default block border border-charcoal-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800`}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={placeholder}
                      />
                      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {getIcon('ChevronUpDown', 'h-5 w-5 fill-current')}
                      </ComboboxButton>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery('')}
                    >
                      <ComboboxOptions className="focus:outline-none h-32 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
                        {filteredOptions?.length === 0 && query !== '' ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-charcoal-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredOptions?.map((option) => (
                            <ComboboxOption
                              key={option?.value}
                              className={({ focus }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  focus
                                    ? 'bg-scarlet-800 text-white'
                                    : 'text-charcoal-900'
                                }`
                              }
                              value={option?.value}
                            >
                              {({ selected, focus }) => (
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
                                        focus
                                          ? 'text-white'
                                          : 'text-scarlet-800'
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
                            </ComboboxOption>
                          ))
                        )}
                      </ComboboxOptions>
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
AutocompleteMultiple.propTypes = {
  disabled: bool,
  label: string,
  nameId: string.isRequired,
  options: arrayOf(shape({ label: string, value: any })),
  placeholder: string,
  control: object,
  helpText: string,
}

export default AutocompleteMultiple

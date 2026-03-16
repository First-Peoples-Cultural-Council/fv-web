import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function AutocompleteMultiSelect({
  placeholder,
  options,
  onChange,
  onBlur = () => {},
  selectedOptions = [],
}) {
  const [query, setQuery] = useState('')

  const _options = [...options]
  const filteredOptions =
    query === ''
      ? _options
      : _options.filter((option) =>
          option?.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  const onOptionClick = (e) => {
    const hasItem = selectedOptions?.some((option) => option === e)
    // Remove item if already in array otherwise add item
    const updatedSelection = hasItem
      ? [...selectedOptions].filter((option) => option !== e)
      : [...selectedOptions, e]
    // Update form state
    onChange(updatedSelection)
  }

  return (
    <Combobox value={selectedOptions} multiple>
      <div className="relative text-charcoal-700">
        <ComboboxInput
          data-testid="autocomplete-multi-input"
          className="text-sm opacity-100 relative w-full cursor-default block border rounded-lg py-2 px-3 focus:outline-hidden focus:ring-blumine-800 focus:border-blumine-800"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        <ComboboxButton
          data-testid="autocomplete-multi-btn"
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          {getIcon('ChevronUpDown', 'h-5 w-5 fill-current')}
        </ComboboxButton>

        <ComboboxOptions
          transition
          className="transition-opacity duration-100 ease-in text-left focus:outline-hidden max-h-72 absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 shadow-lg"
        >
          {filteredOptions?.map((option) => (
            <ComboboxOption
              key={option?.value?.id || option?.value}
              data-testid={`option-btn-${option?.label}`}
              className="cursor-default select-none p-2 data-focus:bg-charcoal-100"
              value={option?.value}
              onClick={() => onOptionClick(option?.value)}
            >
              {({ selected }) => (
                <div className="inline-flex items-center space-x-2">
                  <span
                    className={`flex items-center rounded-md p-1 border border-blumine-800 ${
                      selected ? 'bg-blumine-800' : 'bg-white'
                    }`}
                  >
                    {getIcon(
                      selected ? 'Checkmark' : '',
                      'h-2 w-2 fill-current text-white',
                    )}
                  </span>
                  <span className="inline-flex truncate data-focus:font-bold text-sm text-charcoal-900">
                    {option?.label}
                  </span>
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  )
}

// PROPTYPES
const { any, array, arrayOf, func, shape, string } = PropTypes
AutocompleteMultiSelect.propTypes = {
  options: arrayOf(shape({ label: string, value: any })),
  placeholder: string,
  selectedOptions: array,
  onChange: func,
  onBlur: func,
}

export default AutocompleteMultiSelect

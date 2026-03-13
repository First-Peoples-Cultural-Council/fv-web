import React, { Fragment, useState } from 'react'

import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'
import PropTypes from 'prop-types'

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
      <div className="relative">
        <ComboboxInput
          data-testid="autocomplete-multi-input"
          className="relative w-full cursor-default block border border-charcoal-200 rounded-lg py-2 px-3 focus:outline-hidden focus:ring-blumine-800 focus:border-blumine-800"
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
          className="transition duration-100 ease-in data-leave:data-closed:opacity-0 focus:outline-hidden h-32 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/50"
        >
          {filteredOptions?.map((option) => (
            <ComboboxOption
              key={option?.value}
              data-testid={`option-btn-${option?.label}`}
              className="relative group cursor-default select-none py-2 pl-10 pr-4 hover:bg-blumine-500 hover:text-white text-charcoal-900"
              value={option?.value}
              onClick={() => onOptionClick(option?.value)}
            >
              {({ selected }) => (
                <>
                  <span className="inline-flex truncate">{option?.label}</span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {getIcon('Checkmark', 'h-5 w-5 fill-current')}
                    </span>
                  ) : null}
                </>
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

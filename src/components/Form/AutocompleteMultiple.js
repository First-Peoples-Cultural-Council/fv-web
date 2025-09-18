import React, { Fragment, useEffect, useState } from 'react'
import { useController } from 'react-hook-form'

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
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
import ValidationError from 'components/Form/ValidationError'

function AutocompleteMultiple({
  control,
  errors,
  placeholder,
  helpText,
  label = '',
  nameId,
  options,
}) {
  const { field } = useController({
    name: nameId,
    control,
  })

  return (
    <Fragment key="FormAutocompleteMultiple">
      <FieldLabel nameId={nameId} text={label} />
      <div className="w-full">
        <CustomCombobox
          field={field}
          label={label}
          placeholder={placeholder}
          options={options}
        />
      </div>
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

function CustomCombobox({ field, placeholder, label = '', options }) {
  const [query, setQuery] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(field?.value)
  const getCurrentLabel = (currentValue) => {
    const currentOption = options?.find(({ value }) => value === currentValue)
    return currentOption?.label ? currentOption?.label : ''
  }
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

  useEffect(() => {
    if (field?.value) setSelectedOptions(field?.value)
    return () => setSelectedOptions([])
  })

  const onOptionClick = (e) => {
    const hasItem = selectedOptions?.some((option) => option === e)
    // Remove item if already in array otherwise add item
    const updatedSelection = hasItem
      ? [...selectedOptions].filter((option) => option !== e)
      : [...selectedOptions, e]
    setSelectedOptions(updatedSelection)
    // Update form state
    field.onChange(updatedSelection)
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <Combobox value={selectedOptions} multiple>
        <div className="relative col-span-6">
          <div className="relative">
            <ComboboxInput
              data-testid="autocomplete-input"
              className="relative w-full cursor-default block border border-charcoal-200 rounded-lg py-2 px-3 focus:outline-hidden focus:ring-blumine-800 focus:border-blumine-800"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              onBlur={field.onBlur}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              {getIcon('ChevronUpDown', 'h-5 w-5 fill-current')}
            </ComboboxButton>
          </div>

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
                    <span className="inline-flex truncate">
                      {option?.label}
                    </span>
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
        <div className="col-span-6">
          <p className="text-xs">Selected {label?.toLowerCase()}:</p>
          {selectedOptions?.length > 0 &&
            selectedOptions
              ?.map((optionValue) => getCurrentLabel(optionValue))
              .join(', ')}
        </div>
      </Combobox>
    </div>
  )
}

// PROPTYPES
const { any, arrayOf, object, shape, string } = PropTypes
AutocompleteMultiple.propTypes = {
  label: string,
  nameId: string.isRequired,
  options: arrayOf(shape({ label: string, value: any })),
  placeholder: string,
  control: object,
  helpText: string,
  errors: object,
}

CustomCombobox.propTypes = {
  label: string,
  options: arrayOf(shape({ label: string, value: any })),
  placeholder: string,
  field: object,
}

export default AutocompleteMultiple

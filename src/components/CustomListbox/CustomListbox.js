import React from 'react'
import PropTypes from 'prop-types'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function CustomListbox({
  selectedValue,
  onChange,
  buttonStyling = 'btn-secondary btn-md',
  options = [],
}) {
  const selectedOption = options?.find(
    ({ value }) => value === selectedValue,
  ) ||
    options?.slice(-1) || { label: '------', value: '' }

  return (
    <Listbox
      id="CustomListbox"
      data-testid={`select-${options?.[0]?.label}`}
      value={selectedValue}
      onChange={onChange}
    >
      <div className="relative w-full">
        <ListboxButton
          className={`${buttonStyling} relative justify-start pr-6`}
        >
          {selectedOption?.icon && getIcon(selectedOption?.icon)}
          <span>{selectedOption?.label}</span>
          <span className="absolute inset-y-0 right-2 flex items-center">
            {getIcon('ChevronDown', 'size-6 shrink-none fill-current')}
          </span>
        </ListboxButton>
        <ListboxOptions
          data-testid="CustomListbox"
          className="z-10 focus:outline-hidden absolute mt-1 max-h-60 flex-col overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-charcoal-300 sm:text-sm transition duration-100 ease-in data-leave:data-closed:opacity-0"
        >
          {options.map((option) => (
            <ListboxOption
              key={option?.value}
              className="group relative w-full inline-flex items-center select-none py-2 pl-10 pr-4 text-charcoal-900 hover:bg-charcoal-50 hover:text-blumine-600 hover:cursor-pointer"
              value={option?.value}
            >
              <div className="inline-flex truncate items-center capitalize group-data-selected:text-blumine-600 group-data-selected:font-bold">
                {option?.icon &&
                  getIcon(option?.icon, 'h-5 w-5 mr-2 fill-current')}
                {option?.label}
              </div>
              {getIcon(
                'Checkmark',
                'invisible absolute left-2 h-5 w-5 text-blumine-600 fill-current group-data-selected:visible',
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
// PROPTYPES
const { any, arrayOf, func, shape, string } = PropTypes
CustomListbox.propTypes = {
  selectedValue: any,
  onChange: func,
  buttonStyling: string,
  options: arrayOf(
    shape({
      label: string,
      icon: string, // optional
      value: string,
    }),
  ),
}

export default CustomListbox

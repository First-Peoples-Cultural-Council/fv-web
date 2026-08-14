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

function SingleSelect({ id, options, handleChange, selectedOption }) {
  return (
    <Listbox
      as="div"
      key={id}
      id={`SingleSelect-${id}`}
      className="relative inline-block text-left"
      value={selectedOption}
      onChange={handleChange}
    >
      <ListboxButton
        className={`group cursor-pointer inline-flex items-center justify-center text-sm border-none rounded-lg p-2 focus:outline-hidden hover:text-charcoal-900 ${
          selectedOption?.value
            ? 'font-bold text-charcoal-900'
            : 'font-medium text-charcoal-500'
        }`}
      >
        <span>{selectedOption?.label}</span>

        {getIcon('ChevronDown', '-mr-1 ml-1 h-5 w-5 shrink-0 fill-current')}
      </ListboxButton>

      <ListboxOptions
        transition
        className="origin-top-left transition duration-300 ease-in-out data-closed:opacity-0 data-closed:scale-95 absolute left-0 z-10 mt-2 rounded-md bg-white py-1 shadow-2xl ring-1 ring-charcoal-200 focus:outline-hidden"
      >
        <div className="space-y-2">
          {options?.map((option) => (
            <ListboxOption
              key={option.value}
              className={({ focus }) =>
                `flex items-center cursor-default p-2 text-sm font-medium ${
                  focus
                    ? 'bg-charcoal-50 text-blumine-700'
                    : 'text-charcoal-900'
                }`
              }
              value={option}
            >
              {({ selected }) => (
                <div className="px-1 space-x-2 flex items-center">
                  {getIcon(
                    selected ? 'Checkmark' : '',
                    'h-4 w-4 fill-current text-blumine-700 m',
                  )}
                  <span
                    className={`whitespace-nowrap ${selected ? 'font-bold text-blumine-700' : ''}`}
                  >
                    {option?.value ? option?.label : '--------'}
                  </span>
                </div>
              )}
            </ListboxOption>
          ))}
        </div>
      </ListboxOptions>
    </Listbox>
  )
}

// PROPTYPES
const { array, func, object, string } = PropTypes
SingleSelect.propTypes = {
  id: string,
  options: array,
  handleChange: func,
  selectedOption: object,
}

export default SingleSelect

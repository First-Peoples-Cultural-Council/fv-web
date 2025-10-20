import React from 'react'
import PropTypes from 'prop-types'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react'
import { useTranslation } from 'react-i18next'

// FPCC
import getIcon from 'common/utils/getIcon'

function ListboxPresentation({ selectedValue, options = [], setValue }) {
  const [t] = useTranslation()
  const selectedOption = options?.find(
    ({ value }) => value === selectedValue,
  ) ||
    options?.slice(-1) || { label: '------', value: '' }
  return (
    <div data-testid="ListboxPresentation">
      <Listbox value={selectedValue} onChange={setValue}>
        <div className="relative w-full">
          <ListboxButton className="relative w-full inline-flex items-center text-left pr-10 bg-white border border-charcoal-200 text-blumine-800 rounded-lg py-2 px-3 focus:outline-hidden focus:ring-blumine-600 focus:border-blumine-600">
            <span className="inline-flex items-center capitalize">
              {getIcon(selectedOption?.icon, 'h-5 w-5 mr-2 fill-current')}
              {selectedOption?.transKey
                ? t(selectedOption?.transKey)
                : selectedOption?.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {getIcon(
                'ChevronUpDown',
                'h-5 w-5 mr-2 text-charcoal-900 fill-current',
              )}
            </span>
          </ListboxButton>
          <ListboxOptions className="z-10 focus:outline-hidden absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-charcoal-300 sm:text-sm transition duration-100 ease-in data-leave:data-closed:opacity-0">
            {options.map((option) => (
              <ListboxOption
                key={option?.value}
                className="group relative w-full inline-flex items-center select-none py-2 pl-10 pr-4 text-charcoal-900 hover:bg-charcoal-50 hover:text-blumine-600 hover:cursor-pointer"
                value={option?.value}
              >
                <div className="inline-flex truncate items-center capitalize group-data-selected:text-blumine-600 group-data-selected:font-bold">
                  {option?.icon &&
                    getIcon(option?.icon, 'h-5 w-5 mr-2 fill-current')}
                  {option?.transKey ? t(option?.transKey) : option?.label}
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
    </div>
  )
}
// PROPTYPES
const { arrayOf, func, shape, string } = PropTypes
ListboxPresentation.propTypes = {
  options: arrayOf(
    shape({
      label: string,
      icon: string,
      value: string,
      transKey: string, // optional
    }),
  ),
  setValue: func,
  selectedValue: string,
}

export default ListboxPresentation

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
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
          <ListboxButton className="relative w-full inline-flex items-center text-left pr-10 bg-white border border-charcoal-200 text-blumine-800 rounded-lg py-2 px-3 focus:outline-hidden focus:ring-scarlet-800 focus:border-scarlet-800">
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
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="z-10 focus:outline-hidden absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/50 sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option?.value}
                  className={({ focus }) =>
                    `relative w-full inline-flex items-center select-none py-2 pl-10 pr-4 ${
                      focus
                        ? 'bg-charcoal-50 text-scarlet-800'
                        : 'text-charcoal-900'
                    }`
                  }
                  value={option?.value}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={`inline-flex truncate items-center capitalize ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option?.icon &&
                          getIcon(option?.icon, 'h-5 w-5 mr-2 fill-current')}
                        {option?.transKey ? t(option?.transKey) : option?.label}
                      </div>
                      {selected
                        ? getIcon(
                            'Checkmark',
                            'absolute left-2 h-5 w-5 fill-current',
                          )
                        : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
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

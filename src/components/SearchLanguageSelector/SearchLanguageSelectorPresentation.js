import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Transition } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function SearchLanguageSelectorPresentation({ selected, onSelect, options }) {
  return (
    <Menu
      id="SearchFilterSelector"
      as="div"
      className="relative inline-block text-left"
    >
      <div aria-label="Search/Go">
        <Menu.Button className="inline-flex justify-center w-full px-2 lg:px-4 py-2 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {options[selected]}
          {getIcon(
            'ChevronDown',
            'w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100',
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-20 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {Object.entries(options).map(([key, label]) => (
              <Menu.Item key={`optionlist-key-${key}`}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={(event) => onSelect(event, key)}
                    className={`${
                      active ? 'bg-gray-200 text-black' : 'text-fv-charcoal'
                    } font-medium group flex rounded-lg items-center w-full px-2 py-2 text-sm`}
                  >
                    {label}
                    {selected === key
                      ? getIcon('Checkmark', 'h-5 w-5 fill-current ml-2')
                      : ''}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
SearchLanguageSelectorPresentation.propTypes = {
  selected: string,
  onSelect: func,
  options: object,
}

export default SearchLanguageSelectorPresentation

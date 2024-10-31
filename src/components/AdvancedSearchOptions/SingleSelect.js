import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function SingleSelect({ id, options, menuAlignment = 'right' }) {
  const [paramValue, setParamValue, removeParamValue] = useSearchParamsState({
    searchParamName: id,
    defaultValue: options?.[0]?.value,
  })

  const selectedOption =
    options?.find(({ value }) => value === paramValue) || options?.[0]

  const handleChange = (option) => {
    if (!option?.value) {
      removeParamValue()
    } else if (option?.value !== paramValue) {
      setParamValue(option?.value)
    }
  }

  return (
    <Listbox
      as="div"
      key={id}
      id={`SingleSelect-${id}`}
      className="relative inline-block text-left"
      value={selectedOption}
      onChange={handleChange}
    >
      <div>
        <ListboxButton
          className={`group inline-flex items-center justify-center text-sm  hover:text-charcoal-900 ${
            selectedOption?.value
              ? 'font-bold text-charcoal-900'
              : 'font-medium text-charcoal-500'
          }`}
        >
          <span>{selectedOption?.label}</span>

          {getIcon(
            'ChevronDown',
            '-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-charcoal-500 group-hover:text-charcoal-900',
          )}
        </ListboxButton>
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
        <ListboxOptions
          className={`absolute ${menuAlignment}-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="space-y-2">
            {options?.map((option) => (
              <ListboxOption
                key={option.value}
                className={({ focus }) =>
                  `flex items-center cursor-default p-2 text-sm font-medium ${
                    focus
                      ? 'bg-charcoal-50 text-scarlet-800'
                      : 'text-fv-charcoal-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <div className="px-4 space-x-4 flex items-center">
                    {getIcon(
                      selected ? 'Checkmark' : '',
                      'h-4 w-4 fill-current text-scarlet-800',
                    )}
                    <span className="whitespace-nowrap">
                      {option?.value ? option?.label : '--------'}
                    </span>
                  </div>
                )}
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </Transition>
    </Listbox>
  )
}

// PROPTYPES
const { array, string } = PropTypes
SingleSelect.propTypes = {
  id: string,
  options: array,
  menuAlignment: string,
}

export default SingleSelect

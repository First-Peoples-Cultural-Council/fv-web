import React, { Fragment, useEffect, useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  Transition,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useLanguages } from 'common/dataHooks/useLanguages'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import { SITES_FILTER } from 'common/constants'

function SearchSitesFilter() {
  const [sitesInUrl, setSitesInUrl] = useSearchParamsState({
    searchParamName: SITES_FILTER,
    defaultValue: '',
  })

  const {
    selectedItems,
    setSelectedItems,
    handleSelectArray,
    handleRemoveItem,
    handleRemoveItems,
    isItemSelected,
    isSubset,
  } = useArrayStateManager({ maxItems: 50 })

  // This is to keep selectedItems and sitesInUrl in sync
  useEffect(() => {
    const siteSlugsArray = selectedItems?.map((site) => site?.slug)
    const siteSlugsString = siteSlugsArray?.join()

    if (sitesInUrl !== siteSlugsString) {
      setSitesInUrl(siteSlugsString)
    }
  }, [selectedItems, sitesInUrl, setSitesInUrl])

  const [query, setQuery] = useState('')
  const { data } = useLanguages({
    query,
  })

  const options = data?.results

  const handleSiteToggle = (site) => {
    let selected = isItemSelected(site)
    if (selected) {
      handleRemoveItem(site)
    } else {
      handleSelectArray([site])
    }
  }

  const handleLanguageToggle = (sites) => {
    let selected = sites.every((site) => isItemSelected(site))
    if (selected) {
      handleRemoveItems(sites)
    } else {
      handleSelectArray(sites)
    }
  }

  const generateListItem = ({ item }) => {
    let selected = isItemSelected(item)
    if (item?.sites?.length > 0) {
      if (isSubset(item?.sites)) {
        selected = true
      }
    }

    return (
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
        <span className="inline-flex truncate data-[focus]:font-bold text-sm text-charcoal-900">
          {item?.title || item?.language}
        </span>
      </div>
    )
  }

  return (
    <div data-testid="FormSearchSitesFilter" className="w-full">
      <div className="lg:space-y-6 mx-2 xl:ml-8 xl:pr-8">
        <Combobox value={selectedItems} multiple>
          <div className="relative text-charcoal-700">
            <div className="relative">
              <ComboboxInput
                className="opacity-100 relative w-full cursor-default block border border-blumine-800 rounded-lg py-2 px-3 focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search languages"
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
              <ComboboxOptions className="focus:outline-none h-72 absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 shadow-lg">
                {options?.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4">
                    Nothing found.
                  </div>
                ) : (
                  options?.map((option) => (
                    <div key={option?.id}>
                      {!option?.noLanguageAssigned &&
                        option?.sites?.length > 0 && (
                          <ComboboxOption
                            className="cursor-default select-none p-2 data-[focus]:bg-charcoal-100"
                            value={option.sites}
                            onClick={() => handleLanguageToggle(option.sites)}
                          >
                            {({ selected }) =>
                              generateListItem({ item: option, selected })
                            }
                          </ComboboxOption>
                        )}
                      {option?.sites?.length > 0 &&
                        option?.sites?.map((site) => (
                          <ComboboxOption
                            key={site?.id}
                            className={`${
                              site?.language ? 'pl-6 pr-2' : 'px-2'
                            } cursor-default select-none py-2 data-[focus]:bg-charcoal-100`}
                            value={site}
                            onClick={() => handleSiteToggle(site)}
                          >
                            {({ selected }) =>
                              generateListItem({ item: site, selected })
                            }
                          </ComboboxOption>
                        ))}
                    </div>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
        {selectedItems.length > 0 && (
          <div>
            <ul className="space-y-2">
              {selectedItems?.map((siteFilter) => (
                <li
                  key={siteFilter?.id}
                  className="inline-flex mr-2 lg:mr-0 lg:block"
                >
                  <button
                    data-testid={`remove-site-btn-${siteFilter?.slug}`}
                    type="button"
                    onClick={() => handleRemoveItem(siteFilter)}
                    className="btn-contained px-2 bg-blumine-100"
                  >
                    <span className="text-charcoal-900 text-sm">
                      {siteFilter?.title}
                    </span>
                    {getIcon('Close', 'btn-icon text-blumine-800')}
                  </button>
                </li>
              ))}
            </ul>
            <button
              data-testid="clear-site-filters-btn"
              type="button"
              className="btn-contained justify-start pl-0 text-blumine-800 bg-white shadow-none mt-2"
              onClick={() => setSelectedItems([])}
            >
              {getIcon('ChevronLeft', 'btn-icon h-8 w-8 fill-current')}
              <span className="">Clear all</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchSitesFilter

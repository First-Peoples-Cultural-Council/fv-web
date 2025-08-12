import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import { TYPE_ENTRY } from 'common/constants'

function HomeSearchForm() {
  const { sitename } = useParams()
  const customBaseUrl = sitename ? `/${sitename}/search` : '/search'

  const {
    displayedSearchTerm,
    handleSearchTermChange,
    searchBoxPlaceholder,
    handleSearchDomainChange,
    searchDomainOptions,
  } = useSearchBoxNavigation({
    customBaseUrl,
    kids: null,
    initialSearchType: TYPE_ENTRY,
  })

  const arraySearchDomainOptions = Array.from(
    Object.entries(searchDomainOptions),
    ([key, value]) => ({ value: key, label: value }),
  )
  const [selected, setSelected] = useState(arraySearchDomainOptions[0])

  const onSearchSubmit = (event) => {
    event.preventDefault()
    handleSearchDomainChange(selected.value)
  }

  return (
    <div id="HomeSearchForm" className="space-y-4 md:space-y-8">
      <div className="flex w-full rounded-lg">
        <form onSubmit={onSearchSubmit} className="flex items-stretch grow">
          <label id="SearchLabel" htmlFor="SearchInput" className="sr-only">
            Search FirstVoices
          </label>
          <input
            data-testid="SearchInput"
            id="SearchInput"
            aria-labelledby="SearchLabel"
            className="block md:h-16 w-full text-base placeholder:text-charcoal-400 text-charcoal-700 rounded-none rounded-l-md pl-4 py-4 overflow-visible truncate border-0"
            type="text"
            placeholder={searchBoxPlaceholder}
            onInput={handleSearchTermChange}
            value={displayedSearchTerm}
          />
        </form>
        <button
          type="button"
          data-testid="SearchSubmit"
          aria-label="Search/Go"
          onClick={onSearchSubmit}
          className="inline-flex w-24 items-center justify-center text-charcoal-700 rounded-r-md bg-charcoal-100 hover:bg-charcoal-200"
        >
          {getIcon('Search', 'fill-current h-6 w-6 ')}
        </button>
      </div>
      <div className="text-center">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          aria-label="Search Domain"
          className="flex flex-col text-left space-y-6 sm:flex-row sm:items-center sm:justify-center sm:space-x-10 sm:space-y-0 [&>*:nth-child(3)]:order-1 [&>*:nth-child(2)]:order-2"
        >
          {arraySearchDomainOptions.map((option) => (
            <Field
              key={option.label}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Radio
                value={option}
                className={`group flex h-6 w-6 items-center justify-center rounded-full border  ${selected.value === option.value ? 'bg-charcoal-100 border-charcoal-100' : 'border-white bg-none'}`}
              >
                {getIcon(
                  'Checkmark',
                  `h-3 w-3 fill-charcoal-700 opacity-0 transition ${selected.value === option.value && 'opacity-100'}`,
                )}
              </Radio>
              <Label className="block font-medium text-base text-white cursor-pointer">
                {option.label}
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default HomeSearchForm

import React from 'react'
import PropTypes from 'prop-types'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchSiteForm from 'components/SearchSiteForm'
import getIcon from 'common/utils/getIcon'
import { TYPE_ENTRY } from 'common/constants'

function SearchPresentation({
  searchType,
  filters,
  handleFilter,
  infiniteQueryResponse,
  sitename,
  entryLabel,
}) {
  const wholeDomain = !sitename

  const getFilterListItems = () =>
    filters.map((filter) => {
      const filterIsActiveClass =
        searchType === filter.type
          ? 'border-l-4 border-blumine-800 bg-blumine-800 text-white'
          : 'text-blumine-800 bg-charcoal-50 lg:bg-white'
      return (
        <li
          key={filter.label}
          id={`SearchFilter${filter.label}`}
          className="col-span-1 transition duration-500 ease-in-out flex-nowrap"
        >
          <button
            data-testid={`${filter.type}-filter-btn`}
            type="button"
            className={`flex w-full items-center justify-center lg:justify-start transition duration-300 ease-in-out text-sm md:text-base lg:text-lg p-2 grow rounded-lg capitalize cursor-pointer leading-tight ${filterIsActiveClass}`}
            onClick={() => handleFilter(filter.type)}
          >
            {filter.type === TYPE_ENTRY ? (
              <span className="h-5 md:h-7 flex items-center">
                {filter.label}
              </span>
            ) : (
              <>
                {getIcon(
                  filter.label,
                  'inline-flex h-5 md:h-7 -ml-3 lg:ml-0 mr-3 fill-current',
                )}
                <span>{filter.label}</span>
              </>
            )}
          </button>
        </li>
      )
    })

  return (
    <div data-testid="SearchPresentation">
      <section
        className={`${
          wholeDomain
            ? 'bg-scarlet-800'
            : 'bg-gradient-to-b from-jade-500 to-jade-700'
        } p-5`}
      >
        <div className="mx-auto lg:w-3/5">
          <SearchSiteForm.Container />
        </div>
      </section>
      <div className="grid grid-cols-11 lg:p-2">
        <div className="col-span-11 lg:col-span-2 lg:mt-2 border-b-2 border-charcoal-100 md:border-0">
          <h2 className="hidden lg:block text-2xl mx-2 xl:ml-8">Filters</h2>
          <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-1 list-none gap-2 py-2 xl:py-4 xl:pr-8 xl:ml-8 items-center mx-2">
            {getFilterListItems()}
          </ul>
        </div>
        <div className="hidden md:block col-span-11 lg:col-span-9">
          <DictionaryList.Presentation
            infiniteQueryResponse={infiniteQueryResponse}
            sitename={sitename}
            showType
            wholeDomain={wholeDomain}
            entryLabel={entryLabel}
          />
        </div>
        <div className="block md:hidden col-span-11">
          <DictionaryGrid.Presentation
            infiniteQueryResponse={infiniteQueryResponse}
            sitename={sitename}
            showType
          />
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, func, object, string } = PropTypes
SearchPresentation.propTypes = {
  searchType: string,
  filters: array,
  handleFilter: func,
  infiniteQueryResponse: object,
  sitename: string,
  entryLabel: string,
}

export default SearchPresentation

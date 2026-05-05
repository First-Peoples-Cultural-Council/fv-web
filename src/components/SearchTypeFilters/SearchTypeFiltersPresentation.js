import React from 'react'
import PropTypes from 'prop-types'

import getIcon from 'common/utils/getIcon'
import { TYPE_ENTRY } from 'common/constants'

function SearchTypeFiltersPresentation({ searchType, filters, handleFilter }) {
  return (
    <div
      data-testid="SearchTypeFiltersPresentation"
      className="mx-2 md:mx-4 xl:ml-7"
    >
      <h2 className="hidden lg:block text-xl font-bold text-charcoal-900 mb-4">
        Filter by:
      </h2>
      <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-1 list-none gap-2">
        {filters?.map((filter) => (
          <li
            key={filter.label}
            id={`SearchFilter${filter.label}`}
            className="col-span-1 transition duration-500 ease-in-out flex-nowrap"
          >
            <button
              data-testid={`${filter.type}-filter-btn`}
              type="button"
              className={`${searchType === filter.type ? 'btn-primary' : 'btn-tertiary'} btn-sm w-full lg:w-auto sm:btn-md lg:justify-start transition duration-500 ease-in-out`}
              onClick={() => handleFilter(filter.type)}
            >
              {filter.type === TYPE_ENTRY ? (
                <span>{filter.label}</span>
              ) : (
                <>
                  {getIcon(filter.label)}
                  <span>{filter.label}</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
// PROPTYPES
const { array, func, string } = PropTypes
SearchTypeFiltersPresentation.propTypes = {
  searchType: string,
  filters: array,
  handleFilter: func,
}

export default SearchTypeFiltersPresentation

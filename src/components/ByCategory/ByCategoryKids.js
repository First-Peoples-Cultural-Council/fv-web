import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryGrid from 'components/DictionaryGrid'
import { TYPE_DICTIONARY } from 'common/constants'
import ByCategoryFilters from 'components/ByCategory/ByCategoryFilters'

function ByCategoryKids({
  categories,
  currentCategory,
  currentParentCategory,
  searchInfiniteQueryResponse,
  searchType,
  sitename,
}) {
  return (
    <div data-testid="ByCategoryKids">
      <div className="grid grid-cols-11 lg:p-2">
        <div className="col-span-11 lg:col-span-3 xl:col-span-2 mt-2 lg:mt-5">
          <ByCategoryFilters
            categories={categories}
            currentCategory={currentCategory}
            currentParentCategory={currentParentCategory}
            searchType={searchType}
            sitename={sitename}
            kids
          />
        </div>
        <div className="col-span-11 lg:col-span-8 xl:col-span-9">
          <div className="bg-charcoal-50 p-4">
            <DictionaryGrid.Presentation
              infiniteQueryResponse={searchInfiniteQueryResponse}
              sitename={sitename}
              showType={searchType === TYPE_DICTIONARY}
              hasSideNav
              kids
            />
          </div>
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
ByCategoryKids.propTypes = {
  categories: array,
  currentCategory: object,
  currentParentCategory: object,
  searchType: string,
  searchInfiniteQueryResponse: object,
  sitename: string,
}

export default ByCategoryKids

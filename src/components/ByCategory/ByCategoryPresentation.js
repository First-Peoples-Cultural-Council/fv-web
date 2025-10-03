import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchTypeSelector from 'components/SearchTypeSelector'
import { TYPE_DICTIONARY } from 'common/constants'
import DictionaryLinks from 'components/DictionaryLinks'
import ByCategoryFilters from 'components/ByCategory/ByCategoryFilters'

function ByCategoryPresentation({
  categories,
  currentCategory,
  currentParentCategory,
  searchInfiniteQueryResponse,
  searchType,
  setSearchType,
  labels,
  sitename,
}) {
  return (
    <div
      data-testid="ByCategoryPresentation"
      className="grid grid-cols-11 lg:p-2"
    >
      <span className="hidden text-2xl font-bold text-center print:block">
        {currentCategory?.title}
      </span>
      {/* Side/Nav */}
      <section className="col-span-11 lg:col-span-3 xl:col-span-2 mt-2 lg:mt-5">
        <ByCategoryFilters
          categories={categories}
          currentCategory={currentCategory}
          currentParentCategory={currentParentCategory}
          searchType={searchType}
          sitename={sitename}
        />
        <div className="hidden lg:block my-5">
          <DictionaryLinks />
        </div>
      </section>
      {/* Main List */}
      <section className="col-span-11 lg:col-span-8 xl:col-span-9 border-l-2 border-charcoal-200 lg:pl-7">
        <div className="block lg:py-4">
          <div className="flex items-center md:border-b border-charcoal-100 px-3 md:pb-2 lg:pb-5 print:hidden">
            <SearchTypeSelector.Container
              selectedSearchType={searchType}
              setSearchType={setSearchType}
            />
          </div>
          <div className="hidden md:block p-2 print:block">
            <DictionaryList.Presentation
              infiniteQueryResponse={searchInfiniteQueryResponse}
              noResultsMessage={
                <>
                  No {labels?.lowercase} have been added to this category yet!
                </>
              }
              sitename={sitename}
              entryLabel={labels?.singular}
              showType
            />
          </div>
          <div className="block md:hidden print:hidden">
            <DictionaryGrid.Presentation
              infiniteQueryResponse={searchInfiniteQueryResponse}
              sitename={sitename}
              showType={searchType === TYPE_DICTIONARY}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
// PROPTYPES
const { array, func, object, string } = PropTypes
ByCategoryPresentation.propTypes = {
  categories: array,
  currentCategory: object,
  currentParentCategory: object,
  searchType: string,
  labels: object,
  setSearchType: func,
  searchInfiniteQueryResponse: object,
  sitename: string,
}

export default ByCategoryPresentation

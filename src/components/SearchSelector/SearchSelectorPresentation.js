import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import SelectorSearchbox from 'components/SelectorSearchbox'

function SearchSelectorPresentation({
  isSelectDialog = false,
  searchQuery,
  searchPromptText,
  setSearchQuery,
  search,
  resultsSection,
  isLoadingEntries,
  hasResults,
  loadRef,
}) {
  return (
    <div id="SearchSelectorPresentation" className="h-full bg-gray-50">
      <div className="h-full w-full flex flex-col">
        {/* Content area */}
        <div className={`${isSelectDialog ? 'w-3/4 mx-auto' : 'w-full'}`}>
          <SelectorSearchbox.Presentation
            onSearchChange={setSearchQuery}
            onSearchSubmit={search}
            searchPlaceholder={searchPromptText}
            searchValue={searchQuery}
          />
        </div>
        <div
          className={isSelectDialog ? 'grow mt-2 h-72 overflow-y-scroll' : ''}
        >
          <Loading.Container isLoading={isLoadingEntries}>
            {hasResults && (
              <div>
                {resultsSection}
                <div ref={loadRef} className="w-full h-10" />
              </div>
            )}
            {!hasResults && (
              <div className="w-full min-h-screen flex col-span-1 md:col-span-3 xl:col-span-4">
                <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
                  {searchQuery
                    ? 'Sorry, there are no results for this search.'
                    : 'Please enter your search above.'}
                </div>
              </div>
            )}
          </Loading.Container>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { bool, func, node, object, string } = PropTypes
SearchSelectorPresentation.propTypes = {
  isSelectDialog: bool,
  searchQuery: string,
  searchPromptText: string,
  setSearchQuery: func,
  search: func,
  resultsSection: node,
  isLoadingEntries: bool,
  hasResults: bool,
  loadRef: object,
}

export default SearchSelectorPresentation

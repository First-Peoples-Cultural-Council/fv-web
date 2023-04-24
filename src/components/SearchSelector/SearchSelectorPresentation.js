import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import getIcon from 'common/getIcon'

function SearchSelectorPresentation({
  isSelectDialog,
  searchQuery,
  searchPromptText,
  setSearchQuery,
  search,
  headerSection,
  resultsSection,
  isLoadingEntries,
  hasResults,
  loadRef,
}) {
  return (
    <div id="SearchSelectorPresentation" className="h-full bg-gray-50">
      <div className="h-full w-full flex flex-col">
        {/* Content area */}
        <div className="w-full">
          <div
            className={`${
              isSelectDialog ? 'w-3/4' : 'w-full'
            } relative z-10 flex items-center h-16 mx-auto bg-white border-b border-gray-200 shadow-sm px-6`}
          >
            <form onSubmit={search} className="w-full flex">
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <button type="submit" className="absolute inset-y-0 left-0 flex items-center">
                  {getIcon('Search', 'fill-current flex-shrink-0 h-5 w-5')}
                </button>
                <input
                  name="search-field"
                  id="search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                  placeholder={searchPromptText}
                  type="search"
                  onChange={setSearchQuery}
                  value={searchQuery}
                />
              </div>
            </form>
          </div>
        </div>
        <div className={isSelectDialog ? 'grow mt-2 h-72 overflow-y-scroll' : ''}>
          <Loading.Container isLoading={isLoadingEntries}>
            {hasResults && (
              <div>
                {headerSection && <div className="w-full flex justify-center mb-5 mt-5">{headerSection}</div>}
                {resultsSection}
              </div>
            )}
            {!hasResults && (
              <div className="w-full flex col-span-1 md:col-span-3 xl:col-span-4">
                <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
                  {searchQuery ? 'Sorry, there are no results for this search.' : 'Please enter your search above.'}
                </div>
              </div>
            )}
          </Loading.Container>
        </div>
      </div>
      <div ref={loadRef} className="w-full h-10" />
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
  loadingContainer: object,
  headerSection: node,
  resultsSection: node,
  isLoadingEntries: bool,
  hasResults: bool,
  loadRef: object,
}

SearchSelectorPresentation.defaultProps = {
  isSelectDialog: false,
}

export default SearchSelectorPresentation

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AdvancedSearchOptions from 'components/AdvancedSearchOptions'
import DashboardEntriesPresentationList from 'components/DashboardEntries/DashboardEntriesPresentationList'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import SearchTypeSelector from 'components/SearchTypeSelector'

function DashboardEntriesPresentation({
  emptyListMessage,
  entryLabel,
  searchInfiniteQueryResponse,
  initialSearchType,
  isDictionary,
  removeFilters,
  searchType,
  setSearchType,
  setShowAdvancedSearch,
  showAdvancedSearch,
}) {
  return (
    <div id="DashboardEntriesPresentation" className="p-5 space-y-3">
      <section className="inline-flex w-full space-x-5 items-center justify-between print:hidden">
        <div className="w-1/2">
          <SearchDictionaryForm.Container
            initialSearchType={initialSearchType}
          />
        </div>
        {isDictionary && (
          <div className="w-1/2 flex items-center justify-between space-x-2">
            {!showAdvancedSearch ? (
              <button
                data-testid="advanced-search-btn"
                type="button"
                className="text-sm underline"
                onClick={() => setShowAdvancedSearch(true)}
              >
                Advanced search
              </button>
            ) : (
              <button
                data-testid="remove-filters-btn"
                type="button"
                className="text-sm underline"
                onClick={() => removeFilters()}
              >
                Remove Filters
              </button>
            )}
            <SearchTypeSelector.Container
              accentColor="charcoal-500"
              selectedSearchType={searchType}
              setSearchType={setSearchType}
            />
          </div>
        )}
      </section>
      {showAdvancedSearch && (
        <section className="w-full">
          <AdvancedSearchOptions.Presentation
            items={searchInfiniteQueryResponse?.data}
          />
        </section>
      )}

      <DashboardEntriesPresentationList
        searchInfiniteQueryResponse={searchInfiniteQueryResponse}
        emptyListMessage={emptyListMessage}
        entryLabel={entryLabel}
      />
    </div>
  )
}
// PROPTYPES
const { bool, func, object, string } = PropTypes
DashboardEntriesPresentation.propTypes = {
  entryLabel: string,
  emptyListMessage: string,
  searchInfiniteQueryResponse: object,
  initialSearchType: string,
  isDictionary: bool,
  removeFilters: func,
  searchType: string,
  setSearchType: func,
  setShowAdvancedSearch: func,
  showAdvancedSearch: bool,
}

export default DashboardEntriesPresentation

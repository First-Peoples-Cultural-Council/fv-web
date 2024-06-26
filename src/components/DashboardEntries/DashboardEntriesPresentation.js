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
  infiniteScroll,
  initialSearchType,
  isDictionary,
  isLoadingEntries,
  items,
  loadRef,
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
                type="button"
                className="text-sm underline"
                onClick={() => setShowAdvancedSearch(true)}
              >
                Advanced search
              </button>
            ) : (
              <button
                type="button"
                className="text-sm underline"
                onClick={() => removeFilters()}
              >
                Remove Filters
              </button>
            )}
            <SearchTypeSelector.Container
              accentColor="tertiaryB"
              selectedSearchType={searchType}
              setSearchType={setSearchType}
            />
          </div>
        )}
      </section>
      {showAdvancedSearch && (
        <section className="w-full">
          <AdvancedSearchOptions.Presentation items={items} />
        </section>
      )}
      <section className="w-full">
        <DashboardEntriesPresentationList
          infiniteScroll={infiniteScroll}
          isLoading={isLoadingEntries}
          items={items}
          emptyListMessage={emptyListMessage}
          entryLabel={entryLabel}
        />
        <div ref={loadRef} className="w-full h-10" />
      </section>
    </div>
  )
}
// PROPTYPES
const { bool, func, object, string } = PropTypes
DashboardEntriesPresentation.propTypes = {
  entryLabel: string,
  emptyListMessage: string,
  infiniteScroll: object,
  initialSearchType: string,
  isDictionary: bool,
  isLoadingEntries: bool,
  items: object,
  loadRef: object,
  removeFilters: func,
  searchType: string,
  setSearchType: func,
  setShowAdvancedSearch: func,
  showAdvancedSearch: bool,
}

export default DashboardEntriesPresentation

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DashboardEntriesPresentationList from 'components/DashboardEntries/DashboardEntriesPresentationList'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import SearchTypeSelector from 'components/SearchTypeSelector'
import AdvancedSearchOptions from 'components/AdvancedSearchOptions'

function DashboardEntriesPresentation({
  infiniteScroll,
  loadRef,
  isLoadingEntries,
  items,
  emptyListMessage,
  isDictionary,
  initialSearchType,
  entryLabel,
  resetSearch,
  searchType,
  setSearchType,
}) {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  return (
    <div id="DashboardEntriesPresentation">
      <section className="inline-flex w-full p-5 space-x-5 items-center justify-between print:hidden">
        <div className="w-1/2">
          <SearchDictionaryForm.Container searchType={initialSearchType} />
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
                onClick={() => resetSearch()}
              >
                Reset
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
        <section className="w-full print:hidden border-b">
          <AdvancedSearchOptions.Presentation />
        </section>
      )}
      <section>
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
  infiniteScroll: object,
  loadRef: object,
  isLoadingEntries: bool,
  items: object,
  resetSearch: func,
  searchType: string,
  setSearchType: func,
  entryLabel: string,
  emptyListMessage: string,
  isDictionary: bool,
  initialSearchType: string,
}

export default DashboardEntriesPresentation

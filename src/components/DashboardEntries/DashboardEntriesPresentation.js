import React from 'react'
import PropTypes from 'prop-types'

import DashboardEntriesPresentationList from 'components/DashboardEntries/DashboardEntriesPresentationList'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import SearchTypeSelector from 'components/SearchTypeSelector'

function DashboardEntriesPresentation({
  infiniteScroll,
  loadRef,
  isLoadingEntries,
  items,
  emptyListMessage,
  showTypeSelector,
  initialSearchType,
  entryLabel,
  searchType,
  setSearchType,
}) {
  return (
    <div id="DashboardEntriesPresentation">
      <section className="inline-flex w-full p-5 space-x-5 items-center justify-between print:hidden">
        <div className="w-2/3">
          <SearchDictionaryForm.Container searchType={initialSearchType} />
        </div>
        {showTypeSelector && (
          <SearchTypeSelector.Container
            accentColor="tertiaryB"
            selectedSearchType={searchType}
            setSearchType={setSearchType}
          />
        )}
      </section>
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
  searchType: string,
  setSearchType: func,
  entryLabel: string,
  emptyListMessage: string,
  showTypeSelector: bool,
  initialSearchType: string,
}

export default DashboardEntriesPresentation

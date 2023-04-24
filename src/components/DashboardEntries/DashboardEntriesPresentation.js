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
      <section className="p-5 print:hidden flex justify-between">
        <div className="w-1/2">
          <SearchDictionaryForm.Container searchType={initialSearchType} />
        </div>

        {showTypeSelector && (
          <SearchTypeSelector.Container
            accentColor={'tertiaryB'}
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

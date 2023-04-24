import React from 'react'

// FPCC
import DashboardEntriesData from 'components/DashboardEntries/DashboardEntriesData'
import DashboardEntriesPresentation from 'components/DashboardEntries/DashboardEntriesPresentation'

function DashboardEntriesContainer() {
  const {
    infiniteScroll,
    isLoadingEntries,
    items,
    loadRef,
    searchType,
    setSearchType,
    entryLabel,
    emptyListMessage,
    showTypeSelector,
    initialSearchType,
  } = DashboardEntriesData()

  return (
    <div id="DashboardEntriesContainer">
      <DashboardEntriesPresentation
        infiniteScroll={infiniteScroll}
        isLoadingEntries={isLoadingEntries}
        items={items}
        loadRef={loadRef}
        searchType={searchType}
        emptyListMessage={emptyListMessage}
        setSearchType={setSearchType}
        showTypeSelector={showTypeSelector}
        initialSearchType={initialSearchType}
        entryLabel={entryLabel}
      />
    </div>
  )
}

export default DashboardEntriesContainer

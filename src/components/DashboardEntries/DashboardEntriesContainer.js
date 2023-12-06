import React from 'react'

// FPCC
import DashboardEntriesData from 'components/DashboardEntries/DashboardEntriesData'
import DashboardEntriesPresentation from 'components/DashboardEntries/DashboardEntriesPresentation'

function DashboardEntriesContainer() {
  const {
    emptyListMessage,
    entryLabel,
    infiniteScroll,
    initialSearchType,
    isDictionary,
    isLoadingEntries,
    items,
    loadRef,
    resetSearch,
    searchType,
    setSearchType,
    setShowAdvancedSearch,
    showAdvancedSearch,
  } = DashboardEntriesData()

  return (
    <div id="DashboardEntriesContainer">
      <DashboardEntriesPresentation
        emptyListMessage={emptyListMessage}
        entryLabel={entryLabel}
        infiniteScroll={infiniteScroll}
        initialSearchType={initialSearchType}
        isDictionary={isDictionary}
        isLoadingEntries={isLoadingEntries}
        items={items}
        loadRef={loadRef}
        resetSearch={resetSearch}
        searchType={searchType}
        setSearchType={setSearchType}
        setShowAdvancedSearch={setShowAdvancedSearch}
        showAdvancedSearch={showAdvancedSearch}
      />
    </div>
  )
}

export default DashboardEntriesContainer

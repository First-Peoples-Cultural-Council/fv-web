import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardEntriesData from 'components/DashboardEntries/DashboardEntriesData'
import DashboardEntriesPresentation from 'components/DashboardEntries/DashboardEntriesPresentation'

function DashboardEntriesContainer({ advancedSearch = false }) {
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
  } = DashboardEntriesData({ advancedSearch })

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

// PROPTYPES
const { bool } = PropTypes

DashboardEntriesContainer.propTypes = {
  advancedSearch: bool,
}

export default DashboardEntriesContainer

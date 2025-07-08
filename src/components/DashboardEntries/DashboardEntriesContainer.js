import React from 'react'
import PropTypes from 'prop-types'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardEntriesData from 'components/DashboardEntries/DashboardEntriesData'
import DashboardEntriesPresentation from 'components/DashboardEntries/DashboardEntriesPresentation'

function DashboardEntriesContainer({ advancedSearch = false }) {
  const {
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
  } = DashboardEntriesData({ advancedSearch })

  return (
    <>
      <SiteDocHead titleArray={['Entries']} />
      <div id="DashboardEntriesContainer">
        <DashboardEntriesPresentation
          emptyListMessage={emptyListMessage}
          entryLabel={entryLabel}
          initialSearchType={initialSearchType}
          isDictionary={isDictionary}
          searchInfiniteQueryResponse={searchInfiniteQueryResponse}
          removeFilters={removeFilters}
          searchType={searchType}
          setSearchType={setSearchType}
          setShowAdvancedSearch={setShowAdvancedSearch}
          showAdvancedSearch={showAdvancedSearch}
        />
      </div>
    </>
  )
}

// PROPTYPES
const { bool } = PropTypes

DashboardEntriesContainer.propTypes = {
  advancedSearch: bool,
}

export default DashboardEntriesContainer

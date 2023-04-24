import React from 'react'
import SearchPresentation from 'components/Search/SearchPresentation'
import SearchData from 'components/Search/SearchData'

function SearchContainer() {
  const {
    actions,
    searchType,
    filters,
    handleFilter,
    infiniteScroll,
    isLoading,
    items,
    loadRef,
    moreActions,
    sitename,
    siteTitle,
    entryLabel,
  } = SearchData()
  return (
    <SearchPresentation
      actions={actions}
      searchType={searchType}
      filters={filters}
      handleFilter={handleFilter}
      infiniteScroll={infiniteScroll}
      isLoading={isLoading}
      items={items}
      loadRef={loadRef}
      moreActions={moreActions}
      sitename={sitename}
      siteTitle={siteTitle}
      entryLabel={entryLabel}
    />
  )
}

export default SearchContainer

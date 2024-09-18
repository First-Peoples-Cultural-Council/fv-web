import React from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchAllSitesLoader from 'common/dataHooks/useSearchAllSitesLoader'
import useSearchType from 'common/hooks/useSearchType'
import { TYPE_ENTRY } from 'common/constants'
import SearchPresentation from 'components/Search/SearchPresentation'

function SearchAllSitesContainer() {
  const [searchParams] = useSearchParams()

  // Filter/Type management
  const {
    searchTypeInUrl,
    setSearchTypeInUrl,
    getSearchTypeLabel,
    typeFilters,
  } = useSearchType({
    initialSearchType: TYPE_ENTRY,
  })

  // fetch results
  const { data, infiniteScroll, loadRef, isInitialLoading } =
    useSearchAllSitesLoader({
      enabled: true,
      searchParams,
    })

  return (
    <SearchPresentation
      actions={['copy']}
      searchType={searchTypeInUrl}
      filters={typeFilters}
      handleFilter={(filter) => {
        setSearchTypeInUrl(filter)
      }}
      infiniteScroll={infiniteScroll}
      isLoading={isInitialLoading}
      items={data}
      loadRef={loadRef}
      moreActions={['share', 'qrcode']}
      siteTitle="FirstVoices"
      entryLabel={getSearchTypeLabel({ searchTypeInUrl })}
    />
  )
}

export default SearchAllSitesContainer

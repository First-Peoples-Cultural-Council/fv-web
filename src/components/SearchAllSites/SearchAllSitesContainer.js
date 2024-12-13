import React from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchAllSitesLoader from 'common/dataHooks/useSearchAllSitesLoader'
import useSearchType from 'common/hooks/useSearchType'
import { TYPE_ENTRY } from 'common/constants'
import SearchPresentation from 'components/Search/SearchPresentation'
import DocHead from 'components/DocHead'

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
  const infiniteQueryResponse = useSearchAllSitesLoader({
    enabled: true,
    searchParams,
  })

  return (
    <>
      <DocHead titleArray={['Search']} />
      <SearchPresentation
        searchType={searchTypeInUrl}
        filters={typeFilters}
        handleFilter={(filter) => {
          setSearchTypeInUrl(filter)
        }}
        infiniteQueryResponse={infiniteQueryResponse}
        siteTitle="FirstVoices"
        entryLabel={getSearchTypeLabel({ searchTypeInUrl })}
      />
    </>
  )
}

export default SearchAllSitesContainer

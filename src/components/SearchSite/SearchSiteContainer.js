import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchType from 'common/hooks/useSearchType'
import { TYPE_ENTRY } from 'common/constants'
import SearchPresentation from 'components/Search/SearchPresentation'
import SiteDocHead from 'components/SiteDocHead'

function SearchSiteContainer() {
  const { site } = useSiteStore()
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const {
    searchTypeInUrl,
    setSearchTypeInUrl,
    getSearchTypeLabel,
    typeFilters,
  } = useSearchType({
    initialSearchType: TYPE_ENTRY,
  })

  // fetch results
  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams,
  })

  return (
    <>
      <SiteDocHead titleArray={['Search']} />
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
        sitename={sitename}
        siteTitle={site?.title}
        entryLabel={getSearchTypeLabel({ searchTypeInUrl })}
      />
    </>
  )
}

export default SearchSiteContainer

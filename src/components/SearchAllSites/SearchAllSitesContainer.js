import React from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchAllSitesLoader from 'common/dataHooks/useSearchAllSitesLoader'
import useSearchType from 'common/hooks/useSearchType'
import { TYPE_ENTRY } from 'common/constants'
import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchSiteForm from 'components/SearchSiteForm'
import SearchTypeFilters from 'components/SearchTypeFilters'
import DocHead from 'components/DocHead'
import SearchSitesFilter from 'components/SearchAllSites/SearchSitesFilter'

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
      <div data-testid="SearchAllSitesContainer">
        <section className="bg-scarlet-800 p-5">
          <div className="mx-auto lg:w-3/5">
            <SearchSiteForm.Container />
          </div>
        </section>
        <div className="grid grid-cols-11 lg:p-2">
          <div className="col-span-11 lg:col-span-2 lg:mt-2 border-b-2 border-charcoal-100 md:border-0">
            <SearchTypeFilters
              searchType={searchTypeInUrl}
              filters={typeFilters}
              handleFilter={(filter) => {
                setSearchTypeInUrl(filter)
              }}
            />
            <SearchSitesFilter />
          </div>
          <div className="hidden md:block col-span-11 lg:col-span-9">
            <DictionaryList.Presentation
              infiniteQueryResponse={infiniteQueryResponse}
              showType
              wholeDomain
              entryLabel={getSearchTypeLabel({ searchTypeInUrl })}
            />
          </div>
          <div className="block md:hidden col-span-11">
            <DictionaryGrid.Presentation
              infiniteQueryResponse={infiniteQueryResponse}
              showType
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchAllSitesContainer

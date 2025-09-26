import React from 'react'
import { useParams, useSearchParams } from 'react-router'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchType from 'common/hooks/useSearchType'
import { TYPE_ENTRY } from 'common/constants'
import SiteDocHead from 'components/SiteDocHead'
import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchSiteForm from 'components/SearchSiteForm'
import SearchTypeFilters from 'components/SearchTypeFilters'

function SearchSiteContainer() {
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
  const infiniteQueryResponse = useSearchLoader({
    searchParams,
  })

  return (
    <>
      <SiteDocHead titleArray={['Search']} />
      <div data-testid="SearchSiteContainer">
        <section className="bg-linear-to-b from-jade-500 to-jade-700 p-5">
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
          </div>
          <div className="hidden md:block col-span-11 lg:col-span-9">
            <DictionaryList.Presentation
              infiniteQueryResponse={infiniteQueryResponse}
              sitename={sitename}
              showType
              entryLabel={getSearchTypeLabel({ searchTypeInUrl })}
            />
          </div>
          <div className="block md:hidden col-span-11">
            <DictionaryGrid.Presentation
              infiniteQueryResponse={infiniteQueryResponse}
              sitename={sitename}
              showType
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchSiteContainer

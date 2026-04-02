import React, { useState } from 'react'
import { useSearchParams } from 'react-router'

// FPCC
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import SearchSpeakersFilter from 'components/AdvancedSearchOptions/SearchSpeakersFilter'
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SiteDocHead from 'components/SiteDocHead'
import { TYPES, TYPE_AUDIO, SORT, SORT_CREATED_DESC } from 'common/constants'

function DashboardMediaAudioContainer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentFile, setCurrentFile] = useState(null)

  const defaultSearchParams = new URLSearchParams({
    [TYPES]: TYPE_AUDIO,
    [SORT]: SORT_CREATED_DESC,
  })

  // Search fetch
  const infiniteQueryResponse = useSearchLoader({
    searchParams: searchParams?.size === 0 ? defaultSearchParams : searchParams,
  })

  const {
    handleSearchNavigation,
    displayedSearchTerm,
    submittedSearchTerm,
    handleSearchTermChange,
    clearSearchTerm,
  } = useSearchBoxNavigation({ initialSearchType: TYPE_AUDIO })

  const handleSearchSubmitWithUrlSync = (event) => {
    handleSearchNavigation(event)
    setCurrentFile(null)
  }

  const clearSearch = (event) => {
    clearSearchTerm(event)
    setSearchParams(defaultSearchParams)
    setCurrentFile(null)
  }

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full min-h-screen bg-charcoal-100"
    >
      <SiteDocHead titleArray={['Audio']} />

      <section className="sticky top-0 z-30 p-3 space-y-2 bg-charcoal-100 print:hidden">
        <h1 className="sr-only">Audio</h1>
        <SelectorSearchbox.Presentation
          onSearchChange={handleSearchTermChange}
          onSearchSubmit={handleSearchSubmitWithUrlSync}
          searchPlaceholder="Search for audio"
          searchValue={displayedSearchTerm}
          submittedSearchTerm={submittedSearchTerm}
          clearSearchTerm={clearSearch}
        />

        <SearchSpeakersFilter />
      </section>

      <SelectorResultsWrapper.Presentation
        infiniteQueryResponse={infiniteQueryResponse}
        resultsSection={
          <DashboardMediaAudioPresentation
            infiniteQueryResponse={infiniteQueryResponse}
            currentFile={
              currentFile ||
              infiniteQueryResponse?.data?.pages?.[0]?.results?.[0]
            }
            setCurrentFile={setCurrentFile}
          />
        }
      />
    </div>
  )
}

export default DashboardMediaAudioContainer

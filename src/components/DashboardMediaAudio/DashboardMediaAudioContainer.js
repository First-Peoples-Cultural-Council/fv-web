import React from 'react'

// FPCC
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import SearchSpeakersFilter from 'components/AdvancedSearchOptions/SearchSpeakersFilter'
import useMediaSearchWithUrlSync from 'common/dataHooks/useMediaSearchWithUrlSync'
import { TYPE_AUDIO } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SiteDocHead from 'components/SiteDocHead'

function DashboardMediaAudioContainer() {
  const {
    infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    currentFile,
    setCurrentFile,
    submittedSearchTerm,
    clearSearchTerm,
  } = useMediaSearchWithUrlSync({ type: TYPE_AUDIO })

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full min-h-screen bg-charcoal-100"
    >
      <SiteDocHead titleArray={['Audio']} />

      <section className="sticky top-0 z-30 p-3 space-y-2 print:hidden">
        <h1 className="sr-only">Audio</h1>
        <SelectorSearchbox.Presentation
          onSearchChange={handleSearchTermChange}
          onSearchSubmit={handleSearchSubmitWithUrlSync}
          searchPlaceholder="Search all audio"
          searchValue={displayedSearchTerm}
          submittedSearchTerm={submittedSearchTerm}
          clearSearchTerm={clearSearchTerm}
        />

        <SearchSpeakersFilter />
      </section>

      <SelectorResultsWrapper.Presentation
        infiniteQueryResponse={infiniteQueryResponse}
        resultsSection={
          <DashboardMediaAudioPresentation
            infiniteQueryResponse={infiniteQueryResponse}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
          />
        }
      />
    </div>
  )
}

export default DashboardMediaAudioContainer

import React from 'react'

// FPCC
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_AUDIO } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function DashboardMediaAudioContainer() {
  const {
    data,
    currentFile,
    setCurrentFile,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    hasResults,
    infiniteScroll,
    isPending,
    loadRef,
    loadLabel,
  } = useMediaSearch({ type: TYPE_AUDIO })

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full bg-charcoal-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full">
          <SelectorSearchbox.Presentation
            onSearchChange={handleSearchTermChange}
            onSearchSubmit={handleSearchSubmitWithUrlSync}
            searchPlaceholder="Search all audio"
            searchValue={displayedSearchTerm}
          />
        </div>
        <div>
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isPending}
            loadRef={loadRef}
            resultsSection={
              <DashboardMediaAudioPresentation
                data={data}
                infiniteScroll={infiniteScroll}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                loadLabel={loadLabel}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardMediaAudioContainer

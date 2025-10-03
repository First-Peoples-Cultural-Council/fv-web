import React from 'react'

// FPCC
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import useMediaSearchWithUrlSync from 'common/dataHooks/useMediaSearchWithUrlSync'
import { TYPE_AUDIO } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function DashboardMediaAudioContainer() {
  const {
    infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    currentFile,
    setCurrentFile,
  } = useMediaSearchWithUrlSync({ type: TYPE_AUDIO })

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full min-h-screen bg-charcoal-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full sticky top-0 z-30 bg-white">
          <SelectorSearchbox.Presentation
            onSearchChange={handleSearchTermChange}
            onSearchSubmit={handleSearchSubmitWithUrlSync}
            searchPlaceholder="Search all audio"
            searchValue={displayedSearchTerm}
          />
        </div>
        <div>
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
      </div>
    </div>
  )
}

export default DashboardMediaAudioContainer

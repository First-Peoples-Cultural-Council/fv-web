import React from 'react'

// FPCC
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_AUDIO } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function DashboardMediaAudioContainer() {
  const {
    media,
    searchValue,
    currentFile,
    setCurrentFile,
    handleSearchSubmitWithUrlSync,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
  } = useMediaSearch({ type: TYPE_AUDIO })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full bg-gray-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full">
          <SelectorSearchbox.Presentation
            onSearchChange={handleTextFieldChange}
            onSearchSubmit={handleSearchSubmitWithUrlSync}
            searchPlaceholder="Search all audio"
            searchValue={searchValue}
          />
        </div>
        <div>
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isLoadingEntries}
            loadRef={loadRef}
            resultsSection={
              <DashboardMediaAudioPresentation
                data={media}
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

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
    searchValue,
    currentFile,
    setCurrentFile,
    handleSearchSubmitWithUrlSync,
    handleTextFieldChange,
    infiniteScroll,
    isPending,
    loadRef,
    loadLabel,
  } = useMediaSearch({ type: TYPE_AUDIO })

  const hasResults = !!(
    data?.pages !== undefined && data?.pages?.[0]?.results?.length > 0
  )

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full bg-charcoal-50"
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

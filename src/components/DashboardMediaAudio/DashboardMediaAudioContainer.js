import React from 'react'

// FPCC
import DashboardMediaAudioData from 'components/DashboardMediaAudio/DashboardMediaAudioData'
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import MediaDetails from 'components/MediaDetails'
import SearchSelector from 'components/SearchSelector'
import { AUDIO } from 'common/constants'

function DashboardMediaAudioContainer() {
  const {
    audio,
    searchValue,
    currentFile,
    setCurrentFile,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
  } = DashboardMediaAudioData()

  const hasResults = !!(
    audio?.pages !== undefined && audio?.pages?.[0]?.results?.length > 0
  )

  return (
    <SearchSelector.Presentation
      searchQuery={searchValue}
      searchPromptText="Search all audio"
      setSearchQuery={handleTextFieldChange}
      search={handleSearchSubmit}
      headerSection=""
      resultsSection={
        <div className="grid grid-cols-3 w-full">
          <main className="col-span-2 pt-4 mx-2">
            <section className="p-2 h-full" aria-labelledby="results-header">
              <h1
                id="results-header"
                className="capitalize flex text-2xl font-bold text-fv-charcoal mb-4"
              >
                Audio
              </h1>
              <DashboardMediaAudioPresentation
                data={audio}
                infiniteScroll={infiniteScroll}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                loadLabel={loadLabel}
              />
            </section>
          </main>
          <aside className="col-span-1 bg-white p-8 border-1 border-gray-200">
            <MediaDetails.Audio file={currentFile} docType={AUDIO} />
          </aside>
        </div>
      }
      isLoadingEntries={isLoadingEntries}
      hasResults={hasResults}
      loadRef={loadRef}
    />
  )
}

export default DashboardMediaAudioContainer

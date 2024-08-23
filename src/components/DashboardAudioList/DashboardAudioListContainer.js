import React from 'react'

// FPCC
import DashboardAudioListData from 'components/DashboardAudioList/DashboardAudioListData'
import DashboardAudioListPresentation from 'components/DashboardAudioList/DashboardAudioListPresentation'
import MediaDetails from 'components/MediaDetails'
import SearchSelector from 'components/SearchSelector'
import { AUDIO } from 'common/constants'

function DashboardAudioListContainer() {
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
    typePlural,
  } = DashboardAudioListData()

  const hasResults = !!(
    audio?.pages !== undefined && audio?.pages?.[0]?.results?.length > 0
  )

  return (
    <SearchSelector.Presentation
      searchQuery={searchValue}
      searchPromptText={`Search all ${typePlural}`}
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
                {typePlural}
              </h1>
              <DashboardAudioListPresentation
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

export default DashboardAudioListContainer

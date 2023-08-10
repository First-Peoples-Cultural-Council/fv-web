import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaBrowserData from 'components/MediaBrowser/MediaBrowserData'
import MediaDetails from 'components/MediaDetails'
import MediaItemsLayout from 'components/MediaItemsLayout'
import SearchSelector from 'components/SearchSelector'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

function MediaBrowserContainerNonModal({ docType }) {
  const {
    media,
    searchValue,
    currentFile,
    setCurrentFile,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
    friendlyDocTypeLabel,
  } = MediaBrowserData({ docType })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  // Switiching Main and Sidebar components based on document type between Audio and Visual
  const BrowserComponent =
    docType === AUDIO ? MediaItemsLayout.Audio : MediaItemsLayout.Visual
  const SidebarComponent =
    docType === AUDIO ? MediaDetails.Audio : MediaDetails.Visual

  return (
    <SearchSelector.Presentation
      searchQuery={searchValue}
      searchPromptText={`Search all ${friendlyDocTypeLabel}`}
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
                {friendlyDocTypeLabel}
              </h1>
              <BrowserComponent
                data={media}
                docType={docType}
                infiniteScroll={infiniteScroll}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                loadLabel={loadLabel}
              />
            </section>
          </main>
          <aside className="col-span-1 bg-white p-8 border-1 border-gray-200">
            <SidebarComponent file={currentFile} docType={docType} />
          </aside>
        </div>
      }
      isLoadingEntries={isLoadingEntries}
      hasResults={hasResults}
      loadRef={loadRef}
    />
  )
}

const { oneOf } = PropTypes

MediaBrowserContainerNonModal.propTypes = {
  docType: oneOf([AUDIO, IMAGE, VIDEO, null]),
}

export default MediaBrowserContainerNonModal

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaBrowserData from 'components/MediaBrowser/MediaBrowserData'
import MediaBrowserPresentation from 'components/MediaBrowser/MediaBrowserPresentation'
import MediaDetails from 'components/MediaDetails'
import SearchSelector from 'components/SearchSelector'
import { IMAGE, VIDEO } from 'common/constants'

function MediaBrowserContainer({ type }) {
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
    docTypePlural,
  } = MediaBrowserData({ type })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  return (
    <SearchSelector.Presentation
      searchQuery={searchValue}
      searchPromptText={`Search all ${docTypePlural}`}
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
                {docTypePlural}
              </h1>
              <MediaBrowserPresentation
                data={media}
                infiniteScroll={infiniteScroll}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                loadLabel={loadLabel}
              />
            </section>
          </main>
          <aside className="col-span-1 bg-white p-8 border-1 border-gray-200">
            <MediaDetails.Visual file={currentFile} docType={type} />
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

MediaBrowserContainer.propTypes = {
  type: oneOf([IMAGE, VIDEO]),
}

export default MediaBrowserContainer

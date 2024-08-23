import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardMediaVisualPresentation from 'components/DashboardMediaVisual/DashboardMediaVisualPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import MediaDetails from 'components/MediaDetails'
import SearchSelector from 'components/SearchSelector'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'

function DashboardMediaVisualContainer({ type }) {
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
    typePlural,
  } = useMediaSearch({ type })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
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
              <DashboardMediaVisualPresentation
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

DashboardMediaVisualContainer.propTypes = {
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
}

export default DashboardMediaVisualContainer

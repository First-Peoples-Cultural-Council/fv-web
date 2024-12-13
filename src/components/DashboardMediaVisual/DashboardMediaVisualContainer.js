import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardMediaVisualPresentation from 'components/DashboardMediaVisual/DashboardMediaVisualPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'

function DashboardMediaVisualContainer({ type }) {
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
    typePlural,
  } = useMediaSearch({ type })

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
            searchPlaceholder={`Search all ${typePlural}`}
            searchValue={searchValue}
          />
        </div>
        <div>
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isPending}
            loadRef={loadRef}
            resultsSection={
              <DashboardMediaVisualPresentation
                data={data}
                infiniteScroll={infiniteScroll}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                loadLabel={loadLabel}
                type={type}
                typePlural={typePlural}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

const { oneOf } = PropTypes

DashboardMediaVisualContainer.propTypes = {
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
}

export default DashboardMediaVisualContainer

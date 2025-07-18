import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardMediaVisualPresentation from 'components/DashboardMediaVisual/DashboardMediaVisualPresentation'
import useMediaSearchWithUrlSync from 'common/dataHooks/useMediaSearchWithUrlSync'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'

function DashboardMediaVisualContainer({ type, searchSharedMedia }) {
  const infiniteQueryResponse = useMediaSearchWithUrlSync({
    type,
    searchSharedMedia,
  })

  const typeDisplayName = searchSharedMedia
    ? `Shared ${infiniteQueryResponse?.typePlural}`
    : infiniteQueryResponse?.typePlural

  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full min-h-screen bg-charcoal-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full sticky top-0 z-30 bg-white">
          <SelectorSearchbox.Presentation
            onSearchChange={infiniteQueryResponse?.handleSearchTermChange}
            onSearchSubmit={
              infiniteQueryResponse?.handleSearchSubmitWithUrlSync
            }
            searchPlaceholder={`Search all ${typeDisplayName}`}
            searchValue={infiniteQueryResponse?.displayedSearchTerm}
          />
        </div>
        <div>
          <h1
            id="results-header"
            className="capitalize flex text-2xl font-bold text-charcoal-900 px-4 py-2"
          >
            {typeDisplayName}
          </h1>
          <SelectorResultsWrapper.Presentation
            infiniteQueryResponse={infiniteQueryResponse}
            resultsSection={
              <DashboardMediaVisualPresentation
                infiniteQueryResponse={infiniteQueryResponse}
                type={type}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

const { bool, oneOf } = PropTypes

DashboardMediaVisualContainer.propTypes = {
  searchSharedMedia: bool,
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
}

export default DashboardMediaVisualContainer

import React from 'react'
import PropTypes from 'prop-types'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardMediaVisualPresentation from 'components/DashboardMediaVisual/DashboardMediaVisualPresentation'
import useMediaSearchWithUrlSync from 'common/dataHooks/useMediaSearchWithUrlSync'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import { capitalizeFirstLetter } from 'common/utils/stringHelpers'

function DashboardMediaVisualContainer({ type, searchSharedMedia }) {
  const infiniteQueryResponse = useMediaSearchWithUrlSync({
    type,
    searchSharedMedia,
  })

  const typeDisplayName = searchSharedMedia
    ? `shared ${infiniteQueryResponse?.typePlural}`
    : infiniteQueryResponse?.typePlural

  let pageTitle
  if (searchSharedMedia) {
    pageTitle = 'Shared Images'
  } else if (type === TYPE_VIDEO) {
    pageTitle = 'Videos'
  } else {
    pageTitle = 'Images'
  }
  return (
    <div
      data-testid="DashboardMediaAudioContainer"
      className="h-full min-h-screen bg-charcoal-50"
    >
      <SiteDocHead titleArray={[pageTitle]} />
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
            className="flex text-2xl font-bold text-charcoal-900 px-4 py-2"
          >
            {capitalizeFirstLetter(typeDisplayName)}
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

import React from 'react'
import PropTypes from 'prop-types'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardMediaVisualPresentation from 'components/DashboardMediaVisual/DashboardMediaVisualPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'

function DashboardMediaVisualContainer({ type }) {
  const infiniteQueryResponse = useMediaSearch({ type })
  const mode = type === TYPE_IMAGE ? 'Images' : 'Videos'

  return (
    <>
      <SiteDocHead titleArray={[`${mode}`]} />
      <div
        data-testid="DashboardMediaAudioContainer"
        className="h-full min-h-screen bg-charcoal-50"
      >
        <div className="h-full w-full flex flex-col">
          <div className="w-full sticky top-0 z-30 bg-white">
            <SelectorSearchbox.Presentation
              onSearchChange={infiniteQueryResponse.handleSearchTermChange}
              onSearchSubmit={
                infiniteQueryResponse.handleSearchSubmitWithUrlSync
              }
              searchPlaceholder={`Search all ${infiniteQueryResponse.typePlural}`}
              searchValue={infiniteQueryResponse.displayedSearchTerm}
            />
          </div>
          <div>
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
    </>
  )
}

DashboardMediaVisualContainer.propTypes = {
  type: PropTypes.oneOf([TYPE_IMAGE, TYPE_VIDEO]),
}

export default DashboardMediaVisualContainer

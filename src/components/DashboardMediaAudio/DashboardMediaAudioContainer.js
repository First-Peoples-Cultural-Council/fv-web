import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardMediaAudioPresentation from 'components/DashboardMediaAudio/DashboardMediaAudioPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_AUDIO } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function DashboardMediaAudioContainer() {
  const infiniteQueryResponse = useMediaSearch({ type: TYPE_AUDIO })

  return (
    <>
      <SiteDocHead titleArray={['Audio']} />
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
              searchPlaceholder="Search all audio"
              searchValue={infiniteQueryResponse?.displayedSearchTerm}
            />
          </div>
          <div>
            <SelectorResultsWrapper.Presentation
              infiniteQueryResponse={infiniteQueryResponse}
              resultsSection={
                <DashboardMediaAudioPresentation
                  infiniteQueryResponse={infiniteQueryResponse}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardMediaAudioContainer

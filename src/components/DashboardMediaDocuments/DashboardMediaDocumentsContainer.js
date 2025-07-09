import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardMediaDocumentsPresentation from 'components/DashboardMediaDocuments/DashboardMediaDocumentsPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_DOCUMENT } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function DashboardMediaDocumentsContainer() {
  const infiniteQueryResponse = useMediaSearch({ type: TYPE_DOCUMENT })

  return (
    <>
      <SiteDocHead titleArray={['Documents']} />
      <div
        data-testid="DashboardMediaDocumentsContainer"
        className="h-full min-h-screen bg-charcoal-50"
      >
        <div className="h-full w-full flex flex-col">
          <div className="w-full sticky top-0 z-30 bg-white">
            <SelectorSearchbox.Presentation
              onSearchChange={infiniteQueryResponse?.handleSearchTermChange}
              onSearchSubmit={
                infiniteQueryResponse?.handleSearchSubmitWithUrlSync
              }
              searchPlaceholder="Search all documents"
              searchValue={infiniteQueryResponse?.displayedSearchTerm}
            />
          </div>
          <div>
            <SelectorResultsWrapper.Presentation
              infiniteQueryResponse={infiniteQueryResponse}
              resultsSection={
                <DashboardMediaDocumentsPresentation
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

export default DashboardMediaDocumentsContainer

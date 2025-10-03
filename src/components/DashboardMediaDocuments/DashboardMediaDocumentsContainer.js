import React from 'react'

// FPCC
import DashboardMediaDocumentsPresentation from 'components/DashboardMediaDocuments/DashboardMediaDocumentsPresentation'
import useMediaSearchWithUrlSync from 'common/dataHooks/useMediaSearchWithUrlSync'
import { TYPE_DOCUMENT } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function DashboardMediaDocumentsContainer() {
  const {
    infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    currentFile,
    setCurrentFile,
  } = useMediaSearchWithUrlSync({
    type: TYPE_DOCUMENT,
  })

  return (
    <div
      data-testid="DashboardMediaDocumentsContainer"
      className="h-full min-h-screen bg-charcoal-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-full sticky top-0 z-30 bg-white">
          <SelectorSearchbox.Presentation
            onSearchChange={handleSearchTermChange}
            onSearchSubmit={handleSearchSubmitWithUrlSync}
            searchPlaceholder="Search all documents"
            searchValue={displayedSearchTerm}
          />
        </div>
        <div>
          <SelectorResultsWrapper.Presentation
            infiniteQueryResponse={infiniteQueryResponse}
            resultsSection={
              <DashboardMediaDocumentsPresentation
                infiniteQueryResponse={infiniteQueryResponse}
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardMediaDocumentsContainer

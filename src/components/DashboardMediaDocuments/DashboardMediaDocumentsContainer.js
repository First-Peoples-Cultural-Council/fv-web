import React from 'react'

// FPCC
import DashboardMediaDocumentsPresentation from 'components/DashboardMediaDocuments/DashboardMediaDocumentsPresentation'
import useMediaSearchWithUrlSync from 'common/dataHooks/useMediaSearchWithUrlSync'
import { TYPE_DOCUMENT } from 'common/constants'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SiteDocHead from 'components/SiteDocHead'

function DashboardMediaDocumentsContainer() {
  const {
    infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    currentFile,
    setCurrentFile,
    submittedSearchTerm,
    clearSearchTerm,
  } = useMediaSearchWithUrlSync({
    type: TYPE_DOCUMENT,
  })

  return (
    <div
      data-testid="DashboardMediaDocumentsContainer"
      className="h-full min-h-screen bg-charcoal-100"
    >
      <SiteDocHead titleArray={['Documents']} />

      <section className="sticky top-0 z-30 p-3 space-y-2 print:hidden">
        <h1 className="sr-only">Documents</h1>
        <SelectorSearchbox.Presentation
          onSearchChange={handleSearchTermChange}
          onSearchSubmit={handleSearchSubmitWithUrlSync}
          searchPlaceholder="Search all documents"
          searchValue={displayedSearchTerm}
          submittedSearchTerm={submittedSearchTerm}
          clearSearchTerm={clearSearchTerm}
        />
      </section>

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
  )
}

export default DashboardMediaDocumentsContainer

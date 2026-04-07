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
  const {
    infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    currentFile,
    setCurrentFile,
    submittedSearchTerm,
    typePlural,
    clearSearchTerm,
  } = useMediaSearchWithUrlSync({
    type,
    searchSharedMedia,
  })

  const typeDisplayName = searchSharedMedia
    ? `shared ${typePlural}`
    : typePlural

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
      data-testid="DashboardMediaVisualContainer"
      className="h-full min-h-screen bg-charcoal-100"
    >
      <SiteDocHead titleArray={[pageTitle]} />

      <section className="sticky top-0 z-30 p-3 space-y-2 bg-charcoal-100 print:hidden">
        <h1 className="sr-only">{capitalizeFirstLetter(typeDisplayName)}</h1>
        <SelectorSearchbox.Presentation
          onSearchChange={handleSearchTermChange}
          onSearchSubmit={handleSearchSubmitWithUrlSync}
          searchPlaceholder={`Search all ${typeDisplayName}`}
          searchValue={displayedSearchTerm}
          submittedSearchTerm={submittedSearchTerm}
          clearSearchTerm={clearSearchTerm}
        />
      </section>

      <SelectorResultsWrapper.Presentation
        infiniteQueryResponse={infiniteQueryResponse}
        resultsSection={
          <DashboardMediaVisualPresentation
            infiniteQueryResponse={infiniteQueryResponse}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            type={type}
          />
        }
      />
    </div>
  )
}

const { bool, oneOf } = PropTypes

DashboardMediaVisualContainer.propTypes = {
  searchSharedMedia: bool,
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
}

export default DashboardMediaVisualContainer

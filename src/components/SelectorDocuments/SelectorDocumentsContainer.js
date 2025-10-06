import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorDocumentsPresentation from 'components/SelectorDocuments/SelectorDocumentsPresentation'
import useMediaSearchModal from 'common/dataHooks/useMediaSearchModal'
import { TYPE_DOCUMENT } from 'common/constants'

function SelectorDocumentsContainer({
  formMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const {
    infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmit,
    handleSearchTermChange,
  } = useMediaSearchModal({ type: TYPE_DOCUMENT })

  return (
    <div
      data-testid="SelectorDocumentsContainer"
      className="h-full bg-charcoal-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-3/4 mx-auto">
          <SelectorSearchbox.Presentation
            onSearchChange={handleSearchTermChange}
            onSearchSubmit={handleSearchSubmit}
            searchPlaceholder="Search all documents"
            searchValue={displayedSearchTerm}
          />
        </div>
        <div className="grow h-72 overflow-y-scroll">
          <SelectorResultsWrapper.Presentation
            infiniteQueryResponse={infiniteQueryResponse}
            resultsSection={
              <SelectorDocumentsPresentation
                infiniteQueryResponse={infiniteQueryResponse}
                formMedia={formMedia}
                selectedMedia={selectedMedia}
                mediaSelectHandler={mediaSelectHandler}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func } = PropTypes
SelectorDocumentsContainer.propTypes = {
  formMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorDocumentsContainer

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorAudioPresentation from 'components/SelectorAudio/SelectorAudioPresentation'
import useMediaSearchModal from 'common/dataHooks/useMediaSearchModal'
import { TYPE_AUDIO } from 'common/constants'

function SelectorAudioContainer({
  formMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const {
    data,
    displayedSearchTerm,
    handleSearchSubmit,
    handleSearchTermChange,
    hasResults,
    infiniteScroll,
    isPending,
    loadRef,
    loadLabel,
  } = useMediaSearchModal({ type: TYPE_AUDIO })

  return (
    <div data-testid="SelectorAudioContainer" className="h-full bg-charcoal-50">
      <div className="h-full w-full flex flex-col">
        <div className="w-3/4 mx-auto">
          <SelectorSearchbox.Presentation
            onSearchChange={handleSearchTermChange}
            onSearchSubmit={handleSearchSubmit}
            searchPlaceholder="Search all audio"
            searchValue={displayedSearchTerm}
          />
        </div>
        <div className="grow mt-2 h-72 overflow-y-scroll">
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isPending}
            loadRef={loadRef}
            resultsSection={
              <SelectorAudioPresentation
                data={data}
                infiniteScroll={infiniteScroll}
                loadLabel={loadLabel}
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
SelectorAudioContainer.propTypes = {
  formMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorAudioContainer

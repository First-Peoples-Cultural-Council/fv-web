import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorVisualMediaGrid from 'components/SelectorVisualMediaGrid'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_IMAGE } from 'common/constants'
import RadioButtonGroup from 'components/RadioButtonGroup'

function SelectorImagesContainer({
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const [searchSharedMedia, setSearchSharedMedia] = useState('false')

  const {
    media,
    searchValue,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
  } = useMediaSearch({
    type: TYPE_IMAGE,
    searchSharedMedia: searchSharedMedia === 'true',
  })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )
  const sharedMediaOptions = [
    { value: 'true', label: 'Shared Images' },
    { value: 'false', label: 'Your image library' },
  ]

  return (
    <div data-testid="SelectorImagesContainer" className="h-full bg-gray-50">
      <div className="h-full w-full flex flex-col">
        <div className="w-3/4 mx-auto">
          <SelectorSearchbox.Presentation
            onSearchChange={handleTextFieldChange}
            onSearchSubmit={handleSearchSubmit}
            searchPlaceholder="Search all images"
            searchValue={searchValue}
          />
        </div>
        <div className="mt-4 mx-auto">
          <RadioButtonGroup.Presentation
            accentColor="primary"
            onChange={setSearchSharedMedia}
            options={sharedMediaOptions}
            value={searchSharedMedia}
          />
        </div>
        <div className="grow h-72 overflow-y-scroll">
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isLoadingEntries}
            loadRef={loadRef}
            resultsSection={
              <div aria-labelledby="results-header">
                <div className="py-4 px-6 text-left">
                  <h2
                    id="results-header"
                    className="text-lg font-bold text-primary"
                  >
                    {searchSharedMedia
                      ? 'Shared media library'
                      : 'Your media uploads'}
                  </h2>
                  <p className="text-sm text-fv-charcoal-light">
                    {searchSharedMedia
                      ? 'These artworks were created by indigenous artists for use on any FirstVoices sites'
                      : 'Images uploaded by you or your team'}
                  </p>
                </div>
                <SelectorVisualMediaGrid.Presentation
                  data={media}
                  infiniteScroll={infiniteScroll}
                  loadLabel={loadLabel}
                  savedMedia={savedMedia}
                  selectedMedia={selectedMedia}
                  mediaSelectHandler={mediaSelectHandler}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func } = PropTypes
SelectorImagesContainer.propTypes = {
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorImagesContainer

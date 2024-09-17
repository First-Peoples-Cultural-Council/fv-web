import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorVisualMediaGrid from 'components/SelectorVisualMediaGrid'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { SHARED_MEDIA, TYPE_IMAGE } from 'common/constants'
import RadioButtonGroup from 'components/RadioButtonGroup'

function SelectorImagesContainer({
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const { sitename } = useParams()
  const [libraryToSearch, setLibraryToSearch] = useState(sitename)

  const {
    media,
    searchValue,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
  } = useMediaSearch({ type: TYPE_IMAGE, library: libraryToSearch })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )
  const libraryOptions = [
    { value: SHARED_MEDIA, label: 'Shared Images' },
    { value: sitename, label: 'Your image library' },
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
            onChange={setLibraryToSearch}
            options={libraryOptions}
            value={libraryToSearch}
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
                    {libraryToSearch === SHARED_MEDIA
                      ? 'Shared media library'
                      : 'Your media uploads'}
                  </h2>
                  <p className="text-sm text-fv-charcoal-light">
                    {libraryToSearch === SHARED_MEDIA
                      ? 'Feel free to use the below art, illustration, and photos created by first nations artist'
                      : 'Images uploaded by your or your team '}
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

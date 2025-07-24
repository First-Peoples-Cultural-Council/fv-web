import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorVisualMediaGrid from 'components/SelectorVisualMediaGrid'
import useMediaSearchModal from 'common/dataHooks/useMediaSearchModal'
import { TYPE_IMAGE } from 'common/constants'
import RadioButtonGroup from 'components/RadioButtonGroup'

function SelectorImagesContainer({
  formMedia,
  selectedMedia,
  mediaSelectHandler,
  hideSharedMedia = false,
}) {
  const [searchSharedMedia, setSearchSharedMedia] = useState('false')

  const infiniteQueryResponse = useMediaSearchModal({
    type: TYPE_IMAGE,
    searchSharedMedia: searchSharedMedia === 'true',
  })

  const sharedMediaOptions = [
    { value: 'true', label: 'Shared images' },
    { value: 'false', label: 'Your image library' },
  ]

  return (
    <div
      data-testid="SelectorImagesContainer"
      className="h-full bg-charcoal-50"
    >
      <div className="h-full w-full flex flex-col">
        <div className="w-3/4 mx-auto">
          <SelectorSearchbox.Presentation
            onSearchChange={infiniteQueryResponse?.handleSearchTermChange}
            onSearchSubmit={infiniteQueryResponse?.handleSearchSubmit}
            searchPlaceholder="Search all images"
            searchValue={infiniteQueryResponse?.displayedSearchTerm}
          />
        </div>
        {!hideSharedMedia && (
          <div className="mt-4 mx-auto">
            <RadioButtonGroup.Presentation
              accentColor="blumine-800"
              onChange={setSearchSharedMedia}
              options={sharedMediaOptions}
              value={searchSharedMedia}
            />
          </div>
        )}
        <div className="grow h-72 overflow-y-scroll">
          <SelectorResultsWrapper.Presentation
            infiniteQueryResponse={infiniteQueryResponse}
            resultsSection={
              <div aria-labelledby="results-header">
                <div className="py-4 px-6 text-left">
                  <h2
                    id="results-header"
                    className="text-lg font-bold text-blumine-800"
                  >
                    {searchSharedMedia === 'true'
                      ? 'Shared media library'
                      : 'Your media uploads'}
                  </h2>
                  <p className="text-sm text-charcoal-500">
                    {searchSharedMedia === 'true' ? (
                      <span>
                        This collection includes artworks created by{' '}
                        <a
                          className="inline-url"
                          href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1225818119/Shared+Media+Library"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Indigenous artists
                        </a>{' '}
                        for use on any FirstVoices site, public domain photos
                        suitable for language learning that have been curated by
                        the FPCC Mentor Apprentice Program, and other images
                        that have been licensed for use on FirstVoices.
                      </span>
                    ) : (
                      'Images uploaded by you or your team'
                    )}
                  </p>
                </div>
                <SelectorVisualMediaGrid.Presentation
                  infiniteQueryResponse={infiniteQueryResponse}
                  formMedia={formMedia}
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
const { array, bool, func } = PropTypes
SelectorImagesContainer.propTypes = {
  formMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
  hideSharedMedia: bool,
}

export default SelectorImagesContainer

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaCrudData from 'components/MediaCrud/MediaCrudData'
import UploadMedia from 'components/MediaCrud/UploadMedia'
import SelectMedia from 'components/MediaCrud/SelectMedia'
// import { DOC_AUDIO, DOC_IMAGE, DOC_VIDEO } from 'common/constants'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import { makeTitleCase } from 'common/utils/stringHelpers'

function MediaCrudContainer({
  savedMedia,
  updateSavedMedia,
  docType,
  maxFiles,
}) {
  const {
    searchValue,
    handleSearchSubmit,
    handleTextFieldChange,
    fetchedMedia,
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
    clearSelectedMedia,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
    docTypeLabelPlural,
    site,
    extensionList,
  } = MediaCrudData({ docType, maxFiles })

  const [selectedTab, setSelectedTab] = useState('Media Library')
  const [allowSwitchTab, setAllowSwitchTab] = useState(true)
  const buttonStyles =
    'w-1/5 border-2 border-wordText rounded-md py-2 px-4 hover:text-white disabled:pointer-events-none disabled:bg-tertiaryB-light disabled:opacity-50'

  useEffect(() => {
    // This checks if a user has selected/uploade any file
    // and if change of tab should be allowed
    if (selectedMedia.length > 0) {
      setAllowSwitchTab(false)
    } else if (selectedMedia.length === 0) {
      setAllowSwitchTab(true)
    }
  }, [selectedMedia])

  const switchTabButton = () => {
    const switchToTab =
      selectedTab === 'Media Library' ? 'Upload Files' : 'Media Library'
    return (
      <button
        type="button"
        className={`${buttonStyles} hover:bg-primary-light`}
        onClick={() => setSelectedTab(`${switchToTab}`)}
      >
        {switchToTab}
      </button>
    )
  }

  return (
    <div id="MediaCrudContainer" className="h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-fv-charcoal mb-4">
          {selectedTab}
        </h2>
      </div>
      <div className="w-full bg-gray-50 flex justify-start">
        {/*
        If no file is selected/uploaded, allow the user to switch tabs
        If a file is uploaded/selected, this button will switch to Insert Media button
        allowing user to attach the selected/uploaded files to the document.
         */}
        {allowSwitchTab ? (
          switchTabButton()
        ) : (
          <button
            type="button"
            className={`${buttonStyles} bg-primary hover:bg-primary-dark text-white`}
            onClick={() => updateSavedMedia(selectedMedia)}
          >
            Insert {selectedMedia.length ? selectedMedia.length : ''}{' '}
            {makeTitleCase(docTypeLabelPlural)}
          </button>
        )}
        <button
          type="button"
          className={`${buttonStyles} mx-2 hover:bg-fv-warning-red`}
          onClick={() => clearSelectedMedia()}
          disabled={selectedTab === 'Upload Files'}
        >
          Clear Selection
        </button>
      </div>
      <div className="grow mt-2">
        {selectedTab === 'Media Library' ? (
          <SelectMedia
            docType={docType}
            searchValue={searchValue}
            handleSearchSubmit={handleSearchSubmit}
            handleTextFieldChange={handleTextFieldChange}
            fetchedMedia={fetchedMedia}
            savedMedia={savedMedia}
            selectedMedia={selectedMedia}
            mediaSelectHandler={mediaSelectHandler}
            infiniteScroll={infiniteScroll}
            isLoadingEntries={isLoadingEntries}
            loadRef={loadRef}
            loadLabel={loadLabel}
            docTypeLabelPlural={docTypeLabelPlural}
          />
        ) : (
          <UploadMedia
            docType={docType}
            site={site}
            extensionList={extensionList}
            setSelectedMedia={setSelectedMedia}
            maxFiles={maxFiles}
          />
        )}
      </div>
    </div>
  )
}

const { array, func, oneOf, number } = PropTypes

MediaCrudContainer.propTypes = {
  savedMedia: array,
  updateSavedMedia: func,
  docType: oneOf([AUDIO, IMAGE, VIDEO]),
  maxFiles: number,
}

export default MediaCrudContainer

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaCrudData from 'components/MediaCrud/MediaCrudData'
import UploadMedia from 'components/MediaCrud/UploadMedia'
import SelectMedia from 'components/MediaCrud/SelectMedia'
import VideoLinks from 'components/MediaCrud/VideoLinks'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import { makeTitleCase } from 'common/utils/stringHelpers'

function MediaCrudContainer({
  savedMedia,
  updateSavedMedia,
  docType,
  maxFiles,
  relatedVideoLinks,
  appendVideoLinks,
  closeModal,
}) {
  const {
    searchValue,
    handleSearchSubmit,
    handleTextFieldChange,
    fetchedMedia,
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
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
    'mx-2 w-1/5 border-2 border-wordText rounded-md py-2 px-4 hover:text-white disabled:pointer-events-none disabled:bg-tertiaryB-light disabled:opacity-50'

  const insertMediaButton = () => (
    <button
      type="button"
      className={`${buttonStyles} bg-primary hover:bg-primary-dark text-white`}
      onClick={() => updateSavedMedia(selectedMedia)}
    >
      Insert {selectedMedia.length ? selectedMedia.length : ''}{' '}
      {makeTitleCase(docTypeLabelPlural)}
    </button>
  )

  useEffect(() => {
    // This checks if a user has selected/uploade any file
    // and if change of tab should be allowed
    if (selectedMedia.length > 0) {
      setAllowSwitchTab(false)
    } else if (selectedMedia.length === 0) {
      setAllowSwitchTab(true)
    }
  }, [selectedMedia])

  return (
    <div id="MediaCrudContainer" className="h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-fv-charcoal mb-4">
          {selectedTab}
        </h2>
      </div>
      <div className="w-full bg-gray-50 flex justify-center">
        {/*
        If no file is uploaded, allow the user to switch tabs
        If a file is uploaded, this button will switch to Insert Media button
        allowing user to attach the selected/uploaded files to the document.
         */}
        {allowSwitchTab || selectedTab !== 'Upload Files' ? (
          <button
            type="button"
            className={`${buttonStyles} ${
              selectedTab === 'Upload Files' && 'bg-primary-light text-white'
            } hover:bg-primary-light`}
            onClick={() => setSelectedTab(`Upload Files`)}
            disabled={!allowSwitchTab}
          >
            Upload New {docType.charAt(0).toUpperCase() + docType.slice(1)}
          </button>
        ) : (
          insertMediaButton()
        )}
        {allowSwitchTab || selectedTab !== 'Media Library' ? (
          <button
            type="button"
            className={`${buttonStyles} ${
              selectedTab === 'Media Library' && 'bg-primary-light text-white'
            } hover:bg-primary-light`}
            onClick={() => setSelectedTab(`Media Library`)}
            disabled={!allowSwitchTab}
          >
            Search {docType.charAt(0).toUpperCase() + docType.slice(1)} Files
          </button>
        ) : (
          insertMediaButton()
        )}
        {docType === VIDEO && (
          <button
            type="button"
            className={`${buttonStyles} ${
              selectedTab === 'Video Links' && 'bg-primary-light text-white'
            } mx-2 hover:bg-primary-light`}
            onClick={() => setSelectedTab(`Video Links`)}
            disabled={!allowSwitchTab && selectedTab !== 'Video Links'}
          >
            Link a Video
          </button>
        )}
      </div>
      <div
        className={`grow mt-2 ${
          selectedTab === 'Upload Files' ? 'overflow-y-scroll' : ''
        }`}
      >
        {selectedTab === 'Media Library' && (
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
        )}
        {selectedTab === 'Upload Files' && (
          <UploadMedia
            docType={docType}
            site={site}
            extensionList={extensionList}
            setSelectedMedia={setSelectedMedia}
            maxFiles={maxFiles}
          />
        )}
        {selectedTab === 'Video Links' && (
          <VideoLinks
            relatedVideoLinks={relatedVideoLinks}
            appendVideoLinks={appendVideoLinks}
            closeModal={closeModal}
            maxLinks={maxFiles}
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
  relatedVideoLinks: array,
  appendVideoLinks: func,
  closeModal: func,
}

export default MediaCrudContainer

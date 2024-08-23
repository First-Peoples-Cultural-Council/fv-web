import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaCrudData from 'components/MediaCrud/MediaCrudData'
import VideoLinks from 'components/MediaCrud/VideoLinks'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import UploadAudio from 'components/UploadAudio'
import UploadVisualMedia from 'components/UploadVisualMedia'
import AudioSelector from 'components/AudioSelector'
import VisualMediaSelector from 'components/VisualMediaSelector'

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
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
    docTypeLabelPlural,
    site,
    extensionList,
  } = MediaCrudData({ type: docType, maxFiles })
  const SEARCH_TAB = 'search-tab'
  const UPLOAD_TAB = 'upload-tab'
  const VLINK_TAB = 'video-link-tab'
  const [selectedTab, setSelectedTab] = useState(SEARCH_TAB)
  const [allowSwitchTab, setAllowSwitchTab] = useState(true)
  const buttonStyles =
    'capitalize disabled:pointer-events-none disabled:bg-tertiaryB-light disabled:opacity-50'

  const insertMediaButton = (
    <button
      data-testid="insert-btn"
      type="button"
      className={`${buttonStyles} capitalize btn-contained`}
      onClick={() => updateSavedMedia(selectedMedia)}
    >
      Insert {selectedMedia.length ? selectedMedia.length : ''}{' '}
      {docTypeLabelPlural}
    </button>
  )

  const uploadButton = (
    <button
      data-testid="upload-tab-btn"
      type="button"
      className={`${buttonStyles} ${
        selectedTab === UPLOAD_TAB ? 'btn-outlined' : 'btn-contained'
      }`}
      onClick={() => setSelectedTab(UPLOAD_TAB)}
      disabled={!allowSwitchTab}
    >
      Upload New {docType}
    </button>
  )
  const searchMediaButton = (
    <button
      data-testid="search-tab-btn"
      type="button"
      className={`${buttonStyles} ${
        selectedTab === SEARCH_TAB ? 'btn-outlined' : 'btn-contained'
      }`}
      onClick={() => setSelectedTab(SEARCH_TAB)}
      disabled={!allowSwitchTab}
    >
      Search {docType} Files
    </button>
  )

  const videoLinkButton = (
    <button
      data-testid="video-link-tab-btn"
      type="button"
      className={`${buttonStyles} ${
        selectedTab === VLINK_TAB && 'bg-primary-light text-white'
      } mx-2 hover:bg-primary-light`}
      onClick={() => setSelectedTab(VLINK_TAB)}
      disabled={!allowSwitchTab && selectedTab !== VLINK_TAB}
    >
      Link a Video
    </button>
  )

  useEffect(() => {
    // This checks if a user has selected/uploaded any file
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
      <div className="w-full bg-gray-50 flex justify-center space-x-2">
        {/*
        If no file is uploaded, allow the user to switch tabs
        If a file is uploaded, this button will switch to Insert Media button
        allowing user to attach the selected/uploaded files to the document.
         */}
        {allowSwitchTab || selectedTab !== UPLOAD_TAB
          ? uploadButton
          : insertMediaButton}
        {allowSwitchTab || selectedTab !== SEARCH_TAB
          ? searchMediaButton
          : insertMediaButton}
        {docType === VIDEO && videoLinkButton}
      </div>
      <div
        className={`grow mt-2 ${
          selectedTab === UPLOAD_TAB ? 'overflow-y-scroll' : ''
        }`}
      >
        {selectedTab === SEARCH_TAB &&
          (docType === AUDIO ? (
            <AudioSelector.Container
              savedMedia={savedMedia}
              selectedMedia={selectedMedia}
              mediaSelectHandler={mediaSelectHandler}
            />
          ) : (
            <VisualMediaSelector.Container
              type={docType}
              savedMedia={savedMedia}
              selectedMedia={selectedMedia}
              mediaSelectHandler={mediaSelectHandler}
            />
          ))}
        {selectedTab === UPLOAD_TAB &&
          (docType === AUDIO ? (
            <UploadAudio
              site={site}
              extensionList={extensionList}
              setSelectedMedia={setSelectedMedia}
            />
          ) : (
            <UploadVisualMedia
              site={site}
              extensionList={extensionList}
              setSelectedMedia={setSelectedMedia}
              type={docType}
              maxFiles={maxFiles}
            />
          ))}
        {selectedTab === VLINK_TAB && (
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaCrud from 'components/MediaCrud'
import { makeTitleCase } from 'common/stringHelpers'
import { DOC_AUDIO, DOC_IMAGE, DOC_VIDEO } from 'common/constants'

function MediaCrudContainer({ savedMedia, updateSavedMedia, docType, maxFiles }) {
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
  } = MediaCrud.Data({ docType, maxFiles })

  const [selectedTab, setSelectedTab] = useState('Media Library')
  const [allowSwitchTab, setAllowSwitchTab] = useState(true)
  const buttonStyles =
    'w-1/5 border-2 border-wordText rounded-md py-2 px-4 hover:text-white disabled:pointer-events-none disabled:bg-tertiaryB-light disabled:opacity-50'

  useEffect(() => {
    // This checks if a user has selected/uploade any file
    // and if change of tab should be allowed
    if (selectedMedia.length > 0) {
      setAllowSwitchTab(false)
    } else if (selectedMedia.length == 0) {
      setAllowSwitchTab(true)
    }
  }, [selectedMedia])

  const switchTabButton = () => {
    const switchToTab = selectedTab == 'Media Library' ? 'Upload Files' : 'Media Library'
    return (
      <button className={`${buttonStyles} hover:bg-primary-light`} onClick={() => setSelectedTab(`${switchToTab}`)}>
        {switchToTab}
      </button>
    )
  }

  return (
    <div id="MediaCrudContainer" className="h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-fv-charcoal mb-4">{selectedTab}</h2>
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
            className={`${buttonStyles} bg-primary hover:bg-primary-dark text-white`}
            onClick={() => updateSavedMedia(selectedMedia)}
          >
            Insert {selectedMedia.length ? selectedMedia.length : ''} {makeTitleCase(docTypeLabelPlural)}
          </button>
        )}
        <button
          className={`${buttonStyles} mx-2 hover:bg-fv-warning-red`}
          onClick={() => clearSelectedMedia()}
          disabled={selectedTab == 'Upload Files'}
        >
          Clear Selection
        </button>
      </div>
      <div className="grow mt-2">
        {selectedTab == 'Media Library' ? (
          <MediaCrud.SelectMedia
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
          <MediaCrud.UploadMedia
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
  docType: oneOf([DOC_AUDIO, DOC_IMAGE, DOC_VIDEO]),
  maxFiles: number,
}

export default MediaCrudContainer

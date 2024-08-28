import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import AddMediaModalData from 'components/AddMediaModal/AddMediaModalData'
import VideoLinkForm from 'components/VideoLinkForm'
import { TYPE_AUDIO, TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import UploadAudio from 'components/UploadAudio'
import UploadVisualMedia from 'components/UploadVisualMedia'
import AudioSelector from 'components/AudioSelector'
import VisualMediaSelector from 'components/VisualMediaSelector'
import Modal from 'components/Modal'
import { getFriendlyDocType } from 'common/utils/stringHelpers'

function AddMediaModalContainer({
  savedMedia,
  updateSavedMedia,
  type,
  maxFiles,
  relatedVideoLinks,
  appendVideoLinks,
  modalOpen,
  closeModal,
}) {
  const { selectedMedia, setSelectedMedia, mediaSelectHandler } =
    AddMediaModalData({ type, maxFiles })

  let tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload',
      btnLabel: `Upload New ${type}`,
    },
    {
      id: 'search-tab',
      title: 'Media Library',
      btnLabel: `Search ${type} Files`,
    },
  ]

  if (type === TYPE_VIDEO && appendVideoLinks) {
    tabOptions = [
      ...tabOptions,
      {
        id: 'video-link-tab',
        title: 'Add Video Link',
        btnLabel: 'Link a Video',
      },
    ]
  }

  const [selectedTab, setSelectedTab] = useState(tabOptions[1])

  const tabButton = (tab) => {
    const itemsSelected = selectedMedia.length > 0
    const tabHasSelectedItems = itemsSelected && selectedTab.id === tab.id
    // If no files are uploaded/selected, allow the user to switch tabs
    // otherwise switch to Insert Media button
    // allowing user to attach the selected/uploaded files to the document.
    const handleOnClick = () => {
      if (tabHasSelectedItems) updateSavedMedia(selectedMedia)
      setSelectedTab(tab)
    }
    return (
      <button
        key={`${tab.id}-btn`}
        data-testid={`${tab.id}-btn`}
        type="button"
        className={`capitalize disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-50 ${
          selectedTab.id === tab.id
            ? 'btn-contained'
            : 'btn-outlined hover:btn-contained'
        }`}
        onClick={handleOnClick}
        disabled={itemsSelected && selectedTab.id !== tab.id}
      >
        {tabHasSelectedItems
          ? `Insert ${selectedMedia.length} ${getFriendlyDocType({
              docType: type,
              plural: true,
            })}`
          : tab.btnLabel}
      </button>
    )
  }

  const uploadTabContents =
    type === TYPE_AUDIO ? (
      <UploadAudio setSelectedMedia={setSelectedMedia} />
    ) : (
      <UploadVisualMedia
        setSelectedMedia={setSelectedMedia}
        type={type}
        maxFiles={maxFiles}
      />
    )

  const searchTabContents =
    type === TYPE_AUDIO ? (
      <AudioSelector.Container
        savedMedia={savedMedia}
        selectedMedia={selectedMedia}
        mediaSelectHandler={mediaSelectHandler}
      />
    ) : (
      <VisualMediaSelector.Container
        type={type}
        savedMedia={savedMedia}
        selectedMedia={selectedMedia}
        mediaSelectHandler={mediaSelectHandler}
      />
    )

  return (
    <Modal.Presentation
      isOpen={modalOpen}
      closeHandler={closeModal}
      isDashboard
    >
      <div className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-hidden bg-gray-50 p-4">
        <div id="AddMediaModalContainer" className="h-full flex flex-col">
          <div>
            <h2 className="text-2xl font-bold text-fv-charcoal mb-4">
              {selectedTab.title}
            </h2>
          </div>
          <div className="w-full bg-gray-50 flex justify-center space-x-2">
            {tabOptions.map((tab) => tabButton(tab))}
          </div>
          <div className="grow mt-2">
            {selectedTab.id === 'upload-tab' && uploadTabContents}
            {selectedTab.id === 'search-tab' && searchTabContents}
            {selectedTab.id === 'video-link-tab' && (
              <VideoLinkForm
                relatedVideoLinks={relatedVideoLinks}
                appendVideoLinks={appendVideoLinks}
                closeModal={closeModal}
                maxLinks={maxFiles}
              />
            )}
          </div>
        </div>
      </div>
    </Modal.Presentation>
  )
}

const { array, bool, func, number, oneOf } = PropTypes

AddMediaModalContainer.propTypes = {
  savedMedia: array,
  updateSavedMedia: func,
  type: oneOf([TYPE_AUDIO, TYPE_IMAGE, TYPE_VIDEO]),
  maxFiles: number,
  relatedVideoLinks: array,
  appendVideoLinks: func,
  closeModal: func,
  modalOpen: bool,
}

export default AddMediaModalContainer

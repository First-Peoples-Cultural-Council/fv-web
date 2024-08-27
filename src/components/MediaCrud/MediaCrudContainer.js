import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaCrudData from 'components/MediaCrud/MediaCrudData'
import VideoLinkForm from 'components/VideoLinkForm'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import UploadAudio from 'components/UploadAudio'
import UploadVisualMedia from 'components/UploadVisualMedia'
import AudioSelector from 'components/AudioSelector'
import VisualMediaSelector from 'components/VisualMediaSelector'

function MediaCrudContainer({
  savedMedia,
  updateSavedMedia,
  type,
  maxFiles,
  relatedVideoLinks,
  appendVideoLinks,
  closeModal,
}) {
  const {
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
    typeLabelPlural,
  } = MediaCrudData({ type, maxFiles })

  const tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload',
      btnLabel: `Upload New ${type}`,
      component:
        type === AUDIO ? (
          <UploadAudio setSelectedMedia={setSelectedMedia} />
        ) : (
          <UploadVisualMedia
            setSelectedMedia={setSelectedMedia}
            type={type}
            maxFiles={maxFiles}
          />
        ),
    },
    {
      id: 'search-tab',
      title: 'Media Library',
      btnLabel: `Search ${type} Files`,
      component:
        type === AUDIO ? (
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
        ),
    },
    {
      id: 'video-link-tab',
      title: 'Add Video Link',
      btnLabel: 'Link a Video',
      component: (
        <VideoLinkForm
          relatedVideoLinks={relatedVideoLinks}
          appendVideoLinks={appendVideoLinks}
          closeModal={closeModal}
          maxLinks={maxFiles}
        />
      ),
    },
  ]

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
          ? `Insert ${selectedMedia.length} ${typeLabelPlural}`
          : tab.btnLabel}
      </button>
    )
  }

  return (
    <div id="MediaCrudContainer" className="h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-fv-charcoal mb-4">
          {selectedTab.title}
        </h2>
      </div>
      <div className="w-full bg-gray-50 flex justify-center space-x-2">
        {tabOptions.map((tab) => tabButton(tab))}
      </div>
      <div className="grow mt-2">{selectedTab.component}</div>
    </div>
  )
}

const { array, func, number, oneOf } = PropTypes

MediaCrudContainer.propTypes = {
  savedMedia: array,
  updateSavedMedia: func,
  type: oneOf([AUDIO, IMAGE, VIDEO]),
  maxFiles: number,
  relatedVideoLinks: array,
  appendVideoLinks: func,
  closeModal: func,
}

export default MediaCrudContainer

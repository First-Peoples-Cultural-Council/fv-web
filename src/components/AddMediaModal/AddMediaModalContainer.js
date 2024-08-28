import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import VideoLinkForm from 'components/VideoLinkForm'
import { TYPE_AUDIO, TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import UploadAudio from 'components/UploadAudio'
import UploadVisualMedia from 'components/UploadVisualMedia'
import AudioSelector from 'components/AudioSelector'
import VisualMediaSelector from 'components/VisualMediaSelector'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'

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
  const { selectedItems, setSelectedItems, handleSelectAdditionalItems } =
    useArrayStateManager({ maxItems: maxFiles })

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

  const uploadTabContents =
    type === TYPE_AUDIO ? (
      <UploadAudio setSelectedMedia={setSelectedItems} />
    ) : (
      <UploadVisualMedia
        setSelectedMedia={setSelectedItems}
        type={type}
        maxFiles={maxFiles}
      />
    )

  const searchTabContents =
    type === TYPE_AUDIO ? (
      <AudioSelector.Container
        savedMedia={savedMedia}
        selectedMedia={selectedItems}
        mediaSelectHandler={handleSelectAdditionalItems}
      />
    ) : (
      <VisualMediaSelector.Container
        type={type}
        savedMedia={savedMedia}
        selectedMedia={selectedItems}
        mediaSelectHandler={handleSelectAdditionalItems}
      />
    )

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateSavedMedia={updateSavedMedia}
      type={type}
      modalOpen={modalOpen}
      closeModal={closeModal}
      tabOptions={tabOptions}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      <>
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
      </>
    </AddMediaModalWrapper>
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

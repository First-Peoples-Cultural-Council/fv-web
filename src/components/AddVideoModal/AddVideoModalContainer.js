import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import VideoLinkForm from 'components/VideoLinkForm'
import { TYPE_VIDEO } from 'common/constants'
import UploadVisualMedia from 'components/UploadVisualMedia'
import SelectorVideos from 'components/SelectorVideos'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'

function AddVideoModalContainer({
  savedMedia,
  updateSavedMedia,
  maxItems,
  relatedVideoLinks,
  appendVideoLinks,
  modalOpen,
  closeModal,
}) {
  const { selectedItems, setSelectedItems, handleSelectAdditionalItems } =
    useArrayStateManager({ maxItems })

  let tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload Video',
      btnLabel: 'Upload New Video',
      icon: 'Upload',
    },
    {
      id: 'search-tab',
      title: 'Video Library',
      btnLabel: 'Search Videos',
      icon: 'Search',
    },
  ]

  if (appendVideoLinks) {
    tabOptions = [
      ...tabOptions,
      {
        id: 'video-link-tab',
        title: 'Add Video Link',
        btnLabel: 'Link a Video',
        icon: 'Link',
      },
    ]
  }

  const [currentTab, setCurrentTab] = useState(tabOptions[1])

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateSavedMedia={updateSavedMedia}
      type={TYPE_VIDEO}
      modalOpen={modalOpen}
      closeModal={closeModal}
      tabOptions={tabOptions}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
    >
      <>
        {currentTab.id === 'upload-tab' && (
          <UploadVisualMedia
            setSelectedMedia={setSelectedItems}
            type={TYPE_VIDEO}
            maxItems={maxItems}
          />
        )}
        {currentTab.id === 'search-tab' && (
          <SelectorVideos.Container
            savedMedia={savedMedia}
            selectedMedia={selectedItems}
            mediaSelectHandler={handleSelectAdditionalItems}
          />
        )}
        {currentTab.id === 'video-link-tab' && (
          <VideoLinkForm
            relatedVideoLinks={relatedVideoLinks}
            appendVideoLinks={appendVideoLinks}
            closeModal={closeModal}
            maxLinks={maxItems}
          />
        )}
      </>
    </AddMediaModalWrapper>
  )
}

const { array, bool, func, number } = PropTypes

AddVideoModalContainer.propTypes = {
  savedMedia: array,
  updateSavedMedia: func,
  maxItems: number,
  relatedVideoLinks: array,
  appendVideoLinks: func,
  closeModal: func,
  modalOpen: bool,
}

export default AddVideoModalContainer

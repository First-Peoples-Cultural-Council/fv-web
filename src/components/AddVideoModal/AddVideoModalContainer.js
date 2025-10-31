import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import VideoLinkForm from 'components/VideoLinkForm'
import { TYPE_VIDEO } from 'common/constants'
import UploadVisualMedia from 'components/UploadVisualMedia'
import SelectorVideos from 'components/SelectorVideos'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'

function AddVideoModalContainer({
  formMedia,
  updateFormMedia,
  maxItems,
  relatedVideoLinks,
  appendVideoLinks,
  modalOpen,
  closeModal,
}) {
  const { selectedItems, setSelectedItems, handleSelectAdditionalItem } =
    useArrayStateManager({ maxItems })

  // Clear the Selected items when the modal closes
  useEffect(() => {
    if (!modalOpen) {
      setSelectedItems([])
    }
  }, [modalOpen, setSelectedItems])

  let tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload Video',
      btnLabel: 'Upload new video',
      icon: 'Upload',
    },
    {
      id: 'search-tab',
      title: 'Video Library',
      btnLabel: 'Search videos',
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
      updateFormMedia={updateFormMedia}
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
            formMedia={formMedia}
            selectedMedia={selectedItems}
            mediaSelectHandler={handleSelectAdditionalItem}
          />
        )}
        {currentTab.id === 'video-link-tab' && (
          <VideoLinkForm
            relatedVideoLinks={relatedVideoLinks}
            appendVideoLinks={appendVideoLinks}
            closeModal={closeModal}
            maxItems={maxItems}
          />
        )}
      </>
    </AddMediaModalWrapper>
  )
}

const { array, bool, func, number } = PropTypes

AddVideoModalContainer.propTypes = {
  formMedia: array,
  updateFormMedia: func,
  maxItems: number,
  relatedVideoLinks: array,
  appendVideoLinks: func,
  closeModal: func,
  modalOpen: bool,
}

export default AddVideoModalContainer

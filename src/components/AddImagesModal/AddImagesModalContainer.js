import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_IMAGE } from 'common/constants'
import UploadVisualMedia from 'components/UploadVisualMedia'
import VisualMediaSelector from 'components/VisualMediaSelector'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'

function AddImagesModalContainer({
  savedMedia,
  updateSavedMedia,
  maxFiles,
  modalOpen,
  closeModal,
}) {
  const { selectedItems, setSelectedItems, handleSelectAdditionalItems } =
    useArrayStateManager({ maxItems: maxFiles })

  const tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload Images',
      btnLabel: 'Upload New Images',
    },
    {
      id: 'search-tab',
      title: 'Image Library',
      btnLabel: 'Search Image Files',
    },
  ]

  const [selectedTab, setSelectedTab] = useState(tabOptions[1])

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateSavedMedia={updateSavedMedia}
      type={TYPE_IMAGE}
      modalOpen={modalOpen}
      closeModal={closeModal}
      tabOptions={tabOptions}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      <>
        {selectedTab.id === 'upload-tab' && (
          <UploadVisualMedia
            setSelectedMedia={setSelectedItems}
            type={TYPE_IMAGE}
            maxFiles={maxFiles}
          />
        )}
        {selectedTab.id === 'search-tab' && (
          <VisualMediaSelector.Container
            type={TYPE_IMAGE}
            savedMedia={savedMedia}
            selectedMedia={selectedItems}
            mediaSelectHandler={handleSelectAdditionalItems}
          />
        )}
      </>
    </AddMediaModalWrapper>
  )
}

const { array, bool, func, number } = PropTypes

AddImagesModalContainer.propTypes = {
  savedMedia: array,
  updateSavedMedia: func,
  maxFiles: number,
  closeModal: func,
  modalOpen: bool,
}

export default AddImagesModalContainer

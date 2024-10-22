import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_IMAGE } from 'common/constants'
import UploadVisualMedia from 'components/UploadVisualMedia'
import SelectorImages from 'components/SelectorImages'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'

function AddImageModalContainer({
  formMedia,
  updateFormMedia,
  maxItems,
  modalOpen,
  closeModal,
  hideSharedMedia,
}) {
  const { selectedItems, setSelectedItems, handleSelectAdditionalItems } =
    useArrayStateManager({ maxItems })

  // Clear the Selected items when the modal closes
  useEffect(() => {
    if (!modalOpen) {
      setSelectedItems([])
    }
  }, [modalOpen, setSelectedItems])

  const tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload Images',
      btnLabel: 'Upload New Images',
      icon: 'Upload',
    },
    {
      id: 'search-tab',
      title: 'Image Library',
      btnLabel: 'Search Image Files',
      icon: 'Search',
    },
  ]

  const [currentTab, setCurrentTab] = useState(tabOptions[1])

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateFormMedia={updateFormMedia}
      type={TYPE_IMAGE}
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
            type={TYPE_IMAGE}
            maxItems={maxItems}
          />
        )}
        {currentTab.id === 'search-tab' && (
          <SelectorImages.Container
            formMedia={formMedia}
            selectedMedia={selectedItems}
            mediaSelectHandler={handleSelectAdditionalItems}
            hideSharedMedia={hideSharedMedia}
          />
        )}
      </>
    </AddMediaModalWrapper>
  )
}

const { array, bool, func, number } = PropTypes

AddImageModalContainer.propTypes = {
  formMedia: array,
  updateFormMedia: func,
  maxItems: number,
  closeModal: func,
  modalOpen: bool,
  hideSharedMedia: bool,
}

export default AddImageModalContainer

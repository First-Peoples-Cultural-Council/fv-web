import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_DOCUMENT } from 'common/constants'
import UploadVisualMedia from 'components/UploadVisualMedia'
import SelectorDocuments from 'components/SelectorDocuments'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'

function AddDocumentModalContainer({
  formMedia,
  updateFormMedia,
  maxItems,
  modalOpen,
  closeModal,
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
      title: 'Upload Documents',
      btnLabel: 'Upload New Documents',
      icon: 'Upload',
    },
    {
      id: 'search-tab',
      title: 'Document Library',
      btnLabel: 'Search Documents',
      icon: 'Search',
    },
  ]

  const [currentTab, setCurrentTab] = useState(tabOptions[1])

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateFormMedia={updateFormMedia}
      type={TYPE_DOCUMENT}
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
            type={TYPE_DOCUMENT}
            maxItems={maxItems}
          />
        )}
        {currentTab.id === 'search-tab' && (
          <SelectorDocuments.Container
            formMedia={formMedia}
            selectedMedia={selectedItems}
            mediaSelectHandler={handleSelectAdditionalItems}
          />
        )}
      </>
    </AddMediaModalWrapper>
  )
}

const { array, bool, func, number } = PropTypes

AddDocumentModalContainer.propTypes = {
  formMedia: array,
  updateFormMedia: func,
  maxItems: number,
  closeModal: func,
  modalOpen: bool,
}

export default AddDocumentModalContainer

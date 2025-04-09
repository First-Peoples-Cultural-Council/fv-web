import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioUploadForm from 'components/AudioCrud/AudioUploadForm'
import SelectorAudio from 'components/SelectorAudio'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'
import { TYPE_AUDIO } from 'common/constants'

function AddAudioModalContainer({
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
      title: 'Upload',
      btnLabel: 'Upload New Audio',
      icon: 'Upload',
    },
    {
      id: 'search-tab',
      title: 'Media Library',
      btnLabel: 'Search Audio Files',
      icon: 'Search',
    },
  ]

  const [currentTab, setCurrentTab] = useState(tabOptions[1])

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateFormMedia={updateFormMedia}
      type={TYPE_AUDIO}
      modalOpen={modalOpen}
      closeModal={closeModal}
      tabOptions={tabOptions}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
    >
      <>
        {currentTab.id === 'upload-tab' && (
          <AudioUploadForm setSelectedAudio={setSelectedItems} />
        )}
        {currentTab.id === 'search-tab' && (
          <SelectorAudio.Container
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

AddAudioModalContainer.propTypes = {
  formMedia: array,
  updateFormMedia: func,
  maxItems: number,
  closeModal: func,
  modalOpen: bool,
}

export default AddAudioModalContainer

import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import UploadAudio from 'components/UploadAudio'
import AudioSelector from 'components/AudioSelector'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import AddMediaModalWrapper from 'components/AddMediaModalWrapper'
import { TYPE_AUDIO } from 'common/constants'

function AddAudioModalContainer({
  savedMedia,
  updateSavedMedia,
  maxItems,
  modalOpen,
  closeModal,
}) {
  const { selectedItems, setSelectedItems, handleSelectAdditionalItems } =
    useArrayStateManager({ maxItems })

  const tabOptions = [
    {
      id: 'upload-tab',
      title: 'Upload',
      btnLabel: 'Upload New Audio',
    },
    {
      id: 'search-tab',
      title: 'Media Library',
      btnLabel: 'Search Audio Files',
    },
  ]

  const [selectedTab, setSelectedTab] = useState(tabOptions[1])

  return (
    <AddMediaModalWrapper
      selectedMedia={selectedItems}
      updateSavedMedia={updateSavedMedia}
      type={TYPE_AUDIO}
      modalOpen={modalOpen}
      closeModal={closeModal}
      tabOptions={tabOptions}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      <>
        {selectedTab.id === 'upload-tab' && (
          <UploadAudio setSelectedMedia={setSelectedItems} />
        )}
        {selectedTab.id === 'search-tab' && (
          <AudioSelector.Container
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

AddAudioModalContainer.propTypes = {
  savedMedia: array,
  updateSavedMedia: func,
  maxItems: number,
  closeModal: func,
  modalOpen: bool,
}

export default AddAudioModalContainer

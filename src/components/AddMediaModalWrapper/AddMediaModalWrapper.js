import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_AUDIO, TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import Modal from 'components/Modal'
import { getFriendlyDocType } from 'common/utils/stringHelpers'

function AddMediaModalWrapper({
  selectedMedia,
  updateSavedMedia,
  type,
  modalOpen,
  closeModal,
  tabOptions,
  selectedTab,
  setSelectedTab,
  children,
}) {
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

  return (
    <Modal.Presentation
      isOpen={modalOpen}
      closeHandler={closeModal}
      isDashboard
    >
      <div
        id="AddMediaModalWrapper"
        className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-y-scroll bg-gray-50 p-4"
      >
        <div className="h-full flex flex-col">
          <div>
            <h2 className="text-2xl font-bold text-fv-charcoal mb-4">
              {selectedTab.title}
            </h2>
          </div>
          <div className="w-full bg-gray-50 flex justify-center space-x-2">
            {tabOptions.map((tab) => tabButton(tab))}
          </div>
          <div className="grow mt-2">{children}</div>
        </div>
      </div>
    </Modal.Presentation>
  )
}

const { array, bool, func, node, object, oneOf } = PropTypes

AddMediaModalWrapper.propTypes = {
  selectedMedia: array,
  updateSavedMedia: func,
  type: oneOf([TYPE_AUDIO, TYPE_IMAGE, TYPE_VIDEO]),
  tabOptions: array,
  children: node,
  closeModal: func,
  modalOpen: bool,
  selectedTab: object,
  setSelectedTab: func,
}

export default AddMediaModalWrapper

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_AUDIO, TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import Modal from 'components/Modal'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'

function AddMediaModalWrapper({
  selectedMedia,
  setSelectedMedia,
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
      setSelectedMedia([])
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
        {getIcon(tabHasSelectedItems ? 'Add' : tab?.icon, 'btn-icon')}
        <span>
          {tabHasSelectedItems
            ? `Insert ${selectedMedia.length} ${getFriendlyDocType({
                docType: type,
                plural: true,
              })}`
            : tab.btnLabel}
        </span>
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
        className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-y-scroll bg-gray-50 p-6"
      >
        <div className="h-full flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-bold text-fv-charcoal">
            {selectedTab.title}
          </h2>
          <div className="w-full bg-gray-50 flex justify-center space-x-4">
            {tabOptions.map((tab) => tabButton(tab))}
          </div>
          <div className="grow">{children}</div>
        </div>
      </div>
    </Modal.Presentation>
  )
}

const { array, bool, func, node, object, oneOf } = PropTypes

AddMediaModalWrapper.propTypes = {
  selectedMedia: array,
  setSelectedMedia: func,
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

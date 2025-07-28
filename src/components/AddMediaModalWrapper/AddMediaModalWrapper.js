import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  TYPE_AUDIO,
  TYPE_DOCUMENT,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from 'common/constants'
import Modal from 'components/Modal'
import { getFriendlyType } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'

function AddMediaModalWrapper({
  selectedMedia,
  updateFormMedia,
  type,
  modalOpen,
  closeModal,
  tabOptions,
  currentTab,
  setCurrentTab,
  children,
}) {
  const tabButton = (tab) => {
    const itemsSelected = selectedMedia.length > 0
    const tabHasSelectedItems = itemsSelected && currentTab.id === tab.id
    // If no files are uploaded/selected, allow the user to switch tabs
    // otherwise switch to Insert Media button
    // allowing user to attach the selected/uploaded files.
    const handleOnClick = () => {
      if (tabHasSelectedItems) updateFormMedia(selectedMedia)
      setCurrentTab(tab)
    }
    return (
      <button
        key={`${tab.id}-btn`}
        data-testid={`${tab.id}-btn`}
        type="button"
        className={`disabled:pointer-events-none disabled:bg-charcoal-50 disabled:opacity-50 ${
          currentTab.id === tab.id
            ? 'btn-primary btn-md'
            : 'btn-secondary btn-md hover:btn-primary'
        }`}
        onClick={handleOnClick}
        disabled={itemsSelected && currentTab.id !== tab.id}
      >
        {getIcon(tabHasSelectedItems ? 'Add' : tab?.icon)}
        <span>
          {tabHasSelectedItems
            ? `Insert ${selectedMedia.length} ${getFriendlyType({
                type,
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
        className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-y-scroll bg-charcoal-50 p-6"
      >
        <div className="h-full flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-bold text-charcoal-900">
            {currentTab.title}
          </h2>
          <div className="w-full bg-charcoal-50 flex justify-center space-x-4">
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
  updateFormMedia: func,
  type: oneOf([TYPE_AUDIO, TYPE_DOCUMENT, TYPE_IMAGE, TYPE_VIDEO]),
  tabOptions: array,
  children: node,
  closeModal: func,
  modalOpen: bool,
  currentTab: object,
  setCurrentTab: func,
}

export default AddMediaModalWrapper

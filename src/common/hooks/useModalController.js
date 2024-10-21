import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'

// FPCC

function useModalController() {
  const [modalOpen, setModalOpen] = useState(false)

  return {
    modalOpen,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
  }
}

export default useModalController

export function useModalControllerWithCallback({ onCloseCallback = () => {} }) {
  const { modalOpen, openModal, closeModal } = useModalController()
  return {
    modalOpen,
    openModal,
    closeModal,
    closeWithCallback: (params) => {
      onCloseCallback(params)
      closeModal()
    },
  }
}

export function useModalWithFieldArray({ control, nameId }) {
  const { modalOpen, openModal, closeModal } = useModalController()

  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
    keyName: 'key', // https://github.com/react-hook-form/react-hook-form/issues/7562#issuecomment-1016379084
  })

  // Can be a single object or an array of objects
  const appendToFormAndClose = (itemsToAppend) => {
    append(itemsToAppend)

    closeModal()
  }

  return {
    fields,
    appendToFormAndClose,
    remove,
    modalOpen,
    openModal,
    closeModal,
  }
}

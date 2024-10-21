import { useState } from 'react'

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
    closeWithCallback: () => {
      onCloseCallback()
      closeModal()
    },
  }
}

export function useModalSelector(addItems) {
  const { modalOpen, openModal, closeModal } = useModalController()

  // Can be multiple ids for a list of documents
  // or can be just one item's id
  const selectItem = (ids, closeModalAfter = true) => {
    addItems(ids)
    if (closeModalAfter) {
      closeModal()
    }
  }

  return { selectItem, modalOpen, openModal, closeModal }
}

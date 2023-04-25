import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import { DOC_AUDIO, DOC_CATEGORY, DOC_IMAGE, DOC_VIDEO } from 'common/constants'
import useIdArrayField from 'common/hooks/useIdArrayField'
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import MediaCrud from 'components/MediaCrud'
import CategoriesBrowser from 'components/CategoriesBrowser'
import ArrayBrowserField from 'components/Form/ArrayBrowserField'

function DocumentArrayField({
  label,
  nameId,
  helpText,
  control,
  docType,
  docCountLimit,
}) {
  const { value, addItems, removeItem } = useIdArrayField(nameId, control)
  const { modalOpen, openModal, closeModal, selectItem } = useModalSelector(
    addItems,
    removeItem,
  )

  return (
    <ArrayBrowserField
      label={label}
      buttonLabel={`Add ${getFriendlyDocType({ docType })}`}
      nameId={nameId}
      helpText={helpText}
      control={control}
      maxItems={docCountLimit}
      removeItem={removeItem}
      showContent={openModal}
      documentIds={value}
    >
      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={closeModal}
        isDashboard={docType !== DOC_CATEGORY}
      >
        <div
          className={`${
            docType !== DOC_CATEGORY
              ? 'h-9/10-screen w-3/4-screen'
              : 'w-1/2-screen'
          } mx-auto rounded-lg overflow-hidden bg-gray-50`}
        >
          <div className={`${docType !== DOC_CATEGORY ? 'h-full' : ''} p-4`}>
            {(docType === DOC_IMAGE ||
              docType === DOC_VIDEO ||
              docType === DOC_AUDIO) && (
              <MediaCrud.Container
                savedMedia={value}
                updateSavedMedia={selectItem}
                docType={docType}
              />
            )}
            {docType === DOC_CATEGORY && (
              <CategoriesBrowser.Container chooseDocHandler={selectItem} />
            )}
          </div>
        </div>
      </Modal.Presentation>
    </ArrayBrowserField>
  )
}

// PROPTYPES
const { object, number, string } = PropTypes
DocumentArrayField.propTypes = {
  helpText: string,
  label: string,
  docType: string,
  nameId: string.isRequired,
  control: object,
  docCountLimit: number,
}

DocumentArrayField.defaultProps = {
  docType: DOC_IMAGE,
  label: '',
  docCountLimit: 3,
}

export default DocumentArrayField

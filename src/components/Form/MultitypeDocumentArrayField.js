import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocTypes } from 'common/stringHelpers'
import { DOC_WORD, DOC_PHRASE } from 'common/constants'
import useIdArrayField from 'common/useIdArrayField'
import { useModalSelector } from 'common/useModalController'
import Modal from 'components/Modal'
import EntrySelector from 'components/EntrySelector'
import ArrayBrowserField from 'components/Form/ArrayBrowserField'

function MultitypeDocumentArrayField({
  label,
  nameId,
  helpText,
  control,
  docTypes,
  docCountLimit,
}) {
  const { addItems, removeItem, value } = useIdArrayField(nameId, control)
  const { modalOpen, openModal, closeModal, selectItem, unselectItem } =
    useModalSelector(addItems, removeItem)

  return (
    <ArrayBrowserField
      label={label}
      buttonLabel={`Add ${getFriendlyDocTypes({ docTypes })}`}
      nameId={nameId}
      helpText={helpText}
      control={control}
      maxItems={docCountLimit}
      removeItem={removeItem}
      showContent={openModal}
      documentIds={value}
    >
      <Modal.Presentation isOpen={modalOpen} closeHandler={closeModal}>
        <div className="w-1/2-screen mx-auto rounded-lg overflow-hidden">
          <EntrySelector.Container
            docTypes={docTypes}
            addItem={selectItem}
            removeItem={unselectItem}
          />
        </div>
      </Modal.Presentation>
    </ArrayBrowserField>
  )
}

// PROPTYPES
const { object, arrayOf, oneOf, number, string } = PropTypes
MultitypeDocumentArrayField.propTypes = {
  docTypes: arrayOf(oneOf([DOC_WORD, DOC_PHRASE])),
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  docCountLimit: number,
}

MultitypeDocumentArrayField.defaultProps = {
  docTypes: [DOC_WORD],
  label: '',
  docCountLimit: 3,
}

export default MultitypeDocumentArrayField

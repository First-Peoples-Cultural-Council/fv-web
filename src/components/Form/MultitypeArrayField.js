import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocTypes } from 'common/utils/stringHelpers'
import { TYPE_WORD, TYPE_PHRASE } from 'common/constants'
import useIdArrayField from 'common/hooks/useIdArrayField'
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import EntrySelector from 'components/EntrySelector'
import ArrayBrowserField from 'components/Form/ArrayBrowserField'

function MultitypeArrayField({
  label,
  nameId,
  helpText,
  control,
  types,
  docCountLimit,
}) {
  const { addItems, removeItem, value } = useIdArrayField(nameId, control)
  const { modalOpen, openModal, closeModal, selectItem, unselectItem } =
    useModalSelector(addItems, removeItem)

  return (
    <ArrayBrowserField
      label={label}
      buttonLabel={`Add ${getFriendlyDocTypes({ docTypes: types })}`}
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
            types={types}
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
MultitypeArrayField.propTypes = {
  types: arrayOf(oneOf([TYPE_WORD, TYPE_PHRASE])),
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  docCountLimit: number,
}

MultitypeArrayField.defaultProps = {
  types: [TYPE_WORD],
  label: '',
  docCountLimit: 3,
}

export default MultitypeArrayField

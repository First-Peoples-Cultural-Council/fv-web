import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useModalWithFieldArray } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import SelectorEntries from 'components/SelectorEntries'
import { TYPE_WORD, TYPE_PHRASE } from 'common/constants'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'
import XButton from 'components/Form/XButton'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function EntryArrayField({
  label = '',
  nameId,
  helpText,
  maxItems = 6,
  register,
  control,
  types = [TYPE_PHRASE, TYPE_WORD],
  buttonLabel,
  visibility,
  errors,
}) {
  const {
    fields,
    appendToFormAndClose,
    remove,
    modalOpen,
    openModal,
    closeModal,
  } = useModalWithFieldArray({ control, nameId })

  return (
    <Fragment key={`${nameId}_EntryArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div className="space-y-2">
        <ul className="space-y-1">
          {fields.map((field, index) => (
            <li key={field.key} className="btn-contained mr-1">
              <input type="hidden" {...register(`${nameId}.${index}.value`)} />
              <div>{field?.title}</div>
              <XButton onClickHandler={() => remove(index)} />
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <FieldButton
            label={buttonLabel || 'Add related dictionary entries'}
            onClickHandler={openModal}
          />
        )}
        <ValidationError errors={errors} nameId={nameId} />
      </div>
      <HelpText text={helpText} />
      <Modal.Presentation isOpen={modalOpen} closeHandler={closeModal}>
        <SelectorEntries.Container
          formEntries={fields}
          isModalOpen={modalOpen}
          types={types}
          updateFormEntries={appendToFormAndClose}
          visibility={visibility}
        />
      </Modal.Presentation>
    </Fragment>
  )
}

// PROPTYPES
const { array, func, number, object, string } = PropTypes
EntryArrayField.propTypes = {
  helpText: string,
  errors: object,
  label: string,
  maxItems: number,
  minItems: number,
  nameId: string.isRequired,
  control: object,
  register: func,
  types: array,
  buttonLabel: string,
  visibility: string,
}

export default EntryArrayField

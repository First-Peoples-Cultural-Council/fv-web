import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import SelectorEntry from 'components/SelectorEntry'
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  const { modalOpen, openModal, closeModal, selectItem, unselectItem } =
    useModalSelector(append, remove)

  return (
    <Fragment key={`${nameId}_EntryArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div className="space-y-2">
        <ul className="space-y-1">
          {fields.map((field, index) => (
            <li key={field.id} className="btn-contained mr-1">
              <input
                key={field.id}
                type="hidden"
                {...register(`${nameId}.${index}.value`)}
              />
              <div>{field?.title}</div>
              <XButton onClickHandler={() => remove(index)} />
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <FieldButton
            label={buttonLabel || 'Add a related dictionary entry'}
            onClickHandler={openModal}
          />
        )}
      </div>
      <HelpText text={helpText} />

      <ValidationError errors={errors} nameId={nameId} />

      <Modal.Presentation isOpen={modalOpen} closeHandler={closeModal}>
        <div className="w-1/2-screen mx-auto rounded-lg overflow-hidden">
          <SelectorEntry.Container
            types={types}
            addItem={selectItem}
            removeItem={unselectItem}
            visibility={visibility}
          />
        </div>
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

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import EntrySelector from 'components/EntrySelector'
import { TYPE_WORD, TYPE_PHRASE } from 'common/constants'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'

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
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        <ul className="space-y-1">
          {fields.map((field, index) => (
            <li key={field.id} className="btn-contained mr-1">
              <input
                key={field.id}
                type="hidden"
                {...register(`${nameId}.${index}.value`)}
              />
              <div>{field?.title}</div>
              <div className="has-tooltip flex items-center">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-14">
                  Remove
                </span>
                <button
                  data-testid={`remove-entry-btn-${field?.id}`}
                  type="button"
                  aria-label="Remove"
                  className="border p-1 border-transparent inline-flex items-center rounded-lg"
                  onClick={() => remove(index)}
                >
                  {getIcon('Close', 'btn-icon')}
                </button>
              </div>
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
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}

      <ValidationError errors={errors} nameId={nameId} />

      <Modal.Presentation isOpen={modalOpen} closeHandler={closeModal}>
        <div className="w-1/2-screen mx-auto rounded-lg overflow-hidden">
          <EntrySelector.Container
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

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import CategoriesBrowser from 'components/CategoriesBrowser'
import FieldButton from 'components/Form/FieldButton'
import XButton from 'components/Form/XButton'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'

function CategoryArrayField({
  control,
  errors,
  helpText,
  label,
  maxItems = 6,
  nameId,
  register,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  const { modalOpen, openModal, closeModal, selectItem } = useModalSelector(
    append,
    remove,
  )

  return (
    <Fragment key={`${nameId}_CategoryArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-1">
        <ul className="space-y-2">
          {fields.map((item, index) => (
            <li key={item.id} className="btn-contained mr-1">
              <input type="hidden" {...register(`${nameId}.${index}`)} />
              <div>{item?.title}</div>
              <XButton
                label="Remove from category"
                onClickHandler={() => remove(index)}
              />
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <FieldButton label="Add category" onClickHandler={openModal} />
        )}
      </div>
      <HelpText text={helpText} />

      <ValidationError errors={errors} nameId={nameId} />

      <Modal.Presentation isOpen={modalOpen} closeHandler={closeModal}>
        <div className="w-1/2-screen h-screen mx-auto rounded-lg overflow-hidden">
          <CategoriesBrowser.Container chooseDocHandler={selectItem} />
        </div>
      </Modal.Presentation>
    </Fragment>
  )
}

// PROPTYPES
const { func, number, object, string } = PropTypes
CategoryArrayField.propTypes = {
  control: object,
  errors: object,
  helpText: string,
  label: string,
  maxItems: number,
  nameId: string.isRequired,
  register: func,
}

export default CategoryArrayField

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import CategoriesBrowser from 'components/CategoriesBrowser'
import FieldButton from 'components/Form/FieldButton'
function CategoryArrayField({
  label,
  nameId,
  helpText,
  maxItems = 6,
  register,
  control,
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
        <ul className="space-y-2 space-x-1">
          {fields.map((item, index) => (
            <li
              key={item.id}
              className="btn-contained bg-tertiaryB hover:bg-tertiaryB-dark"
            >
              <input type="hidden" {...register(`${nameId}.${index}`)} />
              <div>{item?.title}</div>
              <div className="has-tooltip flex items-center">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-14">
                  Remove from category
                </span>
                <button
                  type="button"
                  data-testid={`remove-category-btn-${item?.id}`}
                  aria-label="Remove from category"
                  className="border p-1 -m-1 border-transparent inline-flex items-center rounded-lg"
                  onClick={() => remove(index)}
                >
                  {getIcon('Close', 'btn-icon')}
                </button>
              </div>
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <FieldButton label="Add category" onClickHandler={openModal} />
        )}
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
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
  helpText: string,
  label: string,
  maxItems: number,
  nameId: string.isRequired,
  control: object,
  register: func,
}

export default CategoryArrayField

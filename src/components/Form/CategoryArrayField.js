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
  maxItems,
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
              className="p-1 inline-flex items-center rounded-lg shadow-md bg-tertiaryB hover:bg-tertiaryB-dark text-white space-x-1"
            >
              <input type="hidden" {...register(`${nameId}.${index}`)} />
              <div className="font-bold text-sm">{item?.title}</div>
              <div className="has-tooltip flex items-center">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-12">
                  Remove from category
                </span>
                <button
                  type="button"
                  aria-label="Remove from category"
                  className="border p-1 border-transparent inline-flex items-center rounded-lg"
                  onClick={() => remove(index)}
                >
                  {getIcon('Close', 'fill-current text-white h-6 w-6')}
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
        <div className="w-1/2-screen h-4/5-screen mx-auto rounded-lg overflow-hidden">
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

CategoryArrayField.defaultProps = {
  maxItems: 6,
}

export default CategoryArrayField

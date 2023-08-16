import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import CategoriesBrowser from 'components/CategoriesBrowser'

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
      <div className="space-y-2 mt-2">
        <ul className="space-y-2 space-x-1">
          {fields.map((item, index) => (
            <li
              key={item.id}
              className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1"
            >
              <input type="hidden" {...register(`${nameId}.${index}`)} />
              <div className="font-bold text-lg">{item?.title}</div>
              <div className="has-tooltip flex items-center">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-12">
                  Delete Translation
                </span>
                <button
                  type="button"
                  aria-label="Delete Translation"
                  className="-mr-1.5 border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
                  onClick={() => remove(index)}
                >
                  {getIcon('Close', 'fill-current text-fv-charcoal h-5 w-5')}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {fields?.length < maxItems && (
          <button
            type="button"
            onClick={() => openModal()}
            className="bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
          >
            {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
            <span>Add {label}</span>
          </button>
        )}
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
      <Modal.Presentation isOpen={modalOpen} closeHandler={closeModal}>
        <div className="w-1/2-screen mx-auto rounded-lg overflow-hidden">
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

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useModalWithFieldArray } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import CategoriesBrowser from 'components/CategoriesBrowser'
import FieldButton from 'components/Form/FieldButton'
import XButton from 'components/Form/XButton'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function CategoryArrayField({
  control,
  errors,
  helpText,
  label,
  maxItems,
  nameId,
  register,
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
    <Fragment key={`${nameId}_CategoryArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div className="space-y-2">
        <ul className="space-y-2">
          {fields.map((item, index) => (
            <li
              key={item.key}
              className="rounded-lg py-1 px-2 inline-flex justify-center items-center space-x-2 text-sm bg-blumine-800 text-white mr-1"
            >
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
        <div className="w-[50vw] h-screen mx-auto rounded-lg overflow-hidden">
          <CategoriesBrowser.Container
            chooseDocHandler={appendToFormAndClose}
            formCategories={fields}
          />
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

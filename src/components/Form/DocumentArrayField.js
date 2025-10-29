import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useModalWithFieldArray } from 'common/hooks/useModalController'
import AddDocumentModal from 'components/AddDocumentModal'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function DocumentArrayField({
  label = '',
  nameId,
  helpText,
  control,
  maxItems,
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
    <Fragment key={`${nameId}_ArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div data-testid="DocumentArrayField" className="space-y-2">
        <ul className="space-y-1">
          {fields?.map((field, index) => (
            <li
              key={field.key}
              className="rounded-lg py-1 px-2 inline-flex justify-center items-center space-x-2 text-sm bg-blumine-800 text-white mr-1"
            >
              <div>{field?.title}</div>
              <XButton onClickHandler={() => remove(index)} />
            </li>
          ))}
        </ul>

        {fields?.length >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton
              label="Add pdf or text document"
              onClickHandler={openModal}
            />
            <AddDocumentModal.Container
              formMedia={fields}
              updateFormMedia={appendToFormAndClose}
              modalOpen={modalOpen}
              closeModal={closeModal}
              maxItems={maxItems}
            />
          </div>
        )}
        <ValidationError errors={errors} nameId={nameId} />
      </div>
      <HelpText text={helpText} />
    </Fragment>
  )
}

// PROPTYPES
const { number, object, string } = PropTypes
DocumentArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
}

export default DocumentArrayField

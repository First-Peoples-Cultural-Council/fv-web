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
  maxItems = 10,
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
        <ul>
          {fields?.length > 0 &&
            fields?.map((document, index) => (
              <li
                key={document?.key}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 pr-0 space-x-1 mr-2 mb-2"
              >
                {document?.title}
                {document?.filename}
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

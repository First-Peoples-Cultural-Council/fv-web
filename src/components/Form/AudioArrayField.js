import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useModalWithFieldArray } from 'common/hooks/useModalController'
import AddAudioModal from 'components/AddAudioModal'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
import MediaThumbnail from 'components/MediaThumbnail'

function AudioArrayField({
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
      <div data-testid="AudioArrayField" className="space-y-2">
        <div>
          {fields?.length > 0 &&
            fields?.map((audioObject, index) => (
              <div
                key={audioObject?.key}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
              >
                <MediaThumbnail.Audio audioObject={audioObject} />
                <XButton onClickHandler={() => remove(index)} />
              </div>
            ))}
        </div>

        {fields?.length >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton label="Add audio" onClickHandler={openModal} />
            <AddAudioModal.Container
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
AudioArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
}

export default AudioArrayField

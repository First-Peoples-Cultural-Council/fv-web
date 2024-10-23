import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useModalWithFieldArray } from 'common/hooks/useModalController'
import AddImageModal from 'components/AddImageModal'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
import MediaThumbnail from 'components/MediaThumbnail'

function ImageArrayField({
  label = '',
  nameId,
  helpText,
  control,
  maxItems = 3,
  errors,
  hideSharedMedia = false,
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
      <div data-testid="ImageArrayField" className="space-y-2">
        <div>
          {fields?.length > 0 &&
            fields?.map((image, index) => (
              <div
                key={image?.key}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 pr-0 space-x-1 mr-2 mb-2"
              >
                <MediaThumbnail.Image
                  imageObject={image}
                  imageStyles="object-cover pointer-events-none"
                />

                <XButton onClickHandler={() => remove(index)} />
              </div>
            ))}
        </div>

        {fields?.length >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton label="Add image" onClickHandler={openModal} />
            <AddImageModal.Container
              formMedia={fields}
              updateFormMedia={appendToFormAndClose}
              modalOpen={modalOpen}
              closeModal={closeModal}
              maxItems={maxItems}
              hideSharedMedia={hideSharedMedia}
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
const { bool, number, object, string } = PropTypes
ImageArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
  hideSharedMedia: bool,
}

export default ImageArrayField

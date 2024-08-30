import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'
import useIdArrayField from 'common/hooks/useIdArrayField'
import { useModalSelector } from 'common/hooks/useModalController'
import AddImageModal from 'components/AddImageModal'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'

function ImageArrayField({
  label = '',
  nameId,
  helpText,
  control,
  maxItems = 3,
  errors,
}) {
  const { value, addItems, removeItem } = useIdArrayField(nameId, control)
  const { modalOpen, openModal, closeModal, selectItem } = useModalSelector(
    addItems,
    removeItem,
  )

  return (
    <Fragment key={`${nameId}_ArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div data-testid="ImageArrayField" className="space-y-2 mt-2">
        <div>
          {value?.length > 0 &&
            value?.map((imageId) => (
              <div
                key={`${imageId}`}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
              >
                <MediaThumbnail.Image
                  id={imageId}
                  imageStyles="object-cover pointer-events-none"
                />

                <XButton onClickHandler={() => removeItem(imageId)} />
              </div>
            ))}
        </div>

        {value?.length >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton label="Add image" onClickHandler={openModal} />
            <AddImageModal.Container
              savedMedia={value}
              updateSavedMedia={selectItem}
              modalOpen={modalOpen}
              closeModal={closeModal}
              maxItems={maxItems}
            />
          </div>
        )}
        <ValidationError errors={errors} nameId={nameId} />
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
    </Fragment>
  )
}

// PROPTYPES
const { number, object, string } = PropTypes
ImageArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
}

export default ImageArrayField

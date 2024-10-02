import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import { useModalSelector } from 'common/hooks/useModalController'
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
    <Fragment key={`${nameId}_ArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div data-testid="ImageArrayField" className="space-y-2">
        <div>
          {fields?.length > 0 &&
            fields?.map((image) => (
              <div
                key={image?.id}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
              >
                <MediaThumbnail.Image
                  imageObject={image}
                  imageStyles="object-cover pointer-events-none"
                />

                <XButton onClickHandler={() => remove(image)} />
              </div>
            ))}
        </div>

        {fields?.length >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton label="Add image" onClickHandler={openModal} />
            <AddImageModal.Container
              savedMedia={fields}
              updateSavedMedia={selectItem}
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
ImageArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
}

export default ImageArrayField

import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

// FPCC
import AddImageModal from 'components/AddImageModal'
import MediaThumbnail from 'components/MediaThumbnail'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function ImageIdField({ label = '', nameId, helpText, control, errors }) {
  return (
    <Fragment key={`${nameId}_ImageIdField`}>
      <FieldLabel nameId={nameId} text={label} />
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <ImageIdFieldButton value={value} onChange={onChange} />
        )}
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

function ImageIdFieldButton({ value, onChange }) {
  const [modalOpen, setModalOpen] = useState(false)

  const updateSavedMedia = (id) => {
    if (isUUID(id[0]?.id)) {
      onChange(id[0]?.id)
    }
    setModalOpen(false)
  }

  return value ? (
    <div className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      <MediaThumbnail.Image
        id={value}
        imageStyles="object-cover pointer-events-none"
      />
      <XButton onClickHandler={() => onChange('')} />
    </div>
  ) : (
    <Fragment key="ImageIdFieldButton">
      <FieldButton
        label="Add Image"
        onClickHandler={() => setModalOpen(true)}
      />
      <AddImageModal.Container
        isDashboard
        savedMedia={[{ id: value }]}
        updateSavedMedia={updateSavedMedia}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        maxItems={1}
        hideSharedMedia
      />
    </Fragment>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
ImageIdField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  errors: object,
}

ImageIdFieldButton.propTypes = {
  value: string,
  onChange: func,
}

export default ImageIdField

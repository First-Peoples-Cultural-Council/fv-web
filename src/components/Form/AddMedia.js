import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

// FPCC
import AddMediaModal from 'components/AddMediaModal'
import MediaThumbnail from 'components/MediaThumbnail'
import { getFriendlyDocType, isUUID } from 'common/utils/stringHelpers'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import ValidationError from 'components/Form/ValidationError'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'

function AddMedia({
  label = '',
  nameId,
  helpText,
  control,
  type = IMAGE,
  errors,
}) {
  return (
    <Fragment key={`${nameId}_AddMedia`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <AddMediaButton value={value} onChange={onChange} type={type} />
        )}
      />
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

function AddMediaButton({ value, onChange, type }) {
  const [modalOpen, setModalOpen] = useState(false)

  const chooseMediaHandler = (id) => {
    if (isUUID(id[0])) {
      onChange(id[0])
    }
    setModalOpen(false)
  }

  const onAddMediaClick = (event) => {
    event.preventDefault()
    if (value) {
      onChange('')
    } else {
      setModalOpen(true)
    }
  }
  return value ? (
    <div className="mt-1 inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      {type === AUDIO && <MediaThumbnail.Audio id={value} />}
      {type === IMAGE && (
        <MediaThumbnail.Image
          id={value}
          imageStyles="object-cover pointer-events-none"
        />
      )}
      {type === VIDEO && <MediaThumbnail.Video id={value} />}
      <XButton onClickHandler={(event) => onAddMediaClick(event)} />
    </div>
  ) : (
    <Fragment key="AddMediaButton">
      <FieldButton
        label={`Add ${getFriendlyDocType({ docType: type })}`}
        onClickHandler={(event) => onAddMediaClick(event)}
      />
      <AddMediaModal.Container
        isDashboard
        savedMedia={[value]}
        updateSavedMedia={chooseMediaHandler}
        type={type}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        maxFiles={1}
      />
    </Fragment>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
AddMedia.propTypes = {
  helpText: string,
  label: string,
  type: string,
  nameId: string.isRequired,
  control: object,
  errors: object,
}

AddMediaButton.propTypes = {
  value: string,
  onChange: func,
  type: string,
}

export default AddMedia

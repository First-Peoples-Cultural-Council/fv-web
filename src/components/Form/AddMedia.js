import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import AddMediaModal from 'components/AddMediaModal'
import MediaThumbnail from 'components/MediaThumbnail'
import { getFriendlyDocType, isUUID } from 'common/utils/stringHelpers'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import ValidationError from 'components/Form/ValidationError'

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
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary -mt-8">
          Remove
        </span>
        <button
          data-testid="remove-btn"
          type="button"
          aria-label="Remove"
          // eslint-disable-next-line react/no-unknown-property
          tooltip="Remove"
          className="border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
          onClick={(event) => onAddMediaClick(event)}
        >
          {getIcon('Close', 'fill-current h-5 w-5')}
        </button>
      </div>
    </div>
  ) : (
    <Fragment key="AddMediaButton">
      <button
        data-testid="add-btn"
        type="button"
        onClick={(event) => onAddMediaClick(event)}
        className="mt-1 btn-outlined"
      >
        {getIcon('Add', 'btn-icon')}
        <span>{`Add ${getFriendlyDocType({ docType: type })}`}</span>
      </button>

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

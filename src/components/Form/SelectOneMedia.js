import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import MediaCrud from 'components/MediaCrud'
import { IMAGE, VIDEO } from 'common/constants'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'

const DEFAULT_MEDIA_VALUE = {
  docId: '',
  docType: '',
}

const FRAGMENT_BUTTON_STYLES =
  'mt-1 mr-4 bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex ' +
  'justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light'

function SelectOneMedia({ label, nameId, control, errors, helpText }) {
  return (
    <div>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>

      <Controller
        id={nameId}
        name={nameId}
        defaultValue={DEFAULT_MEDIA_VALUE}
        control={control}
        render={({ field: { value, onChange } }) => (
          <SelectOneButton value={value} onChange={onChange} />
        )}
      />
      {helpText && (
        <div className="mt-2 text-sm text-fv-charcoal-light">{helpText}</div>
      )}
      <ValidationError errors={errors} nameId={nameId} />
    </div>
  )
}

function SelectOneButton({ value, onChange }) {
  const [docType, setDocType] = useState(null)

  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false)
  const [mediaChoiceModalOpen, setMediaChoiceModalOpen] = useState(false)

  const resetMedia = (event) => {
    event.preventDefault()
    // Clear out values
    if (value.docId) {
      setDocType(null)
      onChange(DEFAULT_MEDIA_VALUE)
    }
  }

  const chooseMediaHandler = (id) => {
    if (isUUID(id[0])) {
      const newMediaObj = {
        docId: id[0],
        docType,
      }
      onChange(newMediaObj)
    }
    setAddMediaModalOpen(false)
  }

  const mediaChoiceButtonClicked = (docTypeChosen) => {
    setDocType(docTypeChosen)
    setMediaChoiceModalOpen(false)
    setAddMediaModalOpen(true)
  }

  return value?.docId ? (
    <div className="mt-1 inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      {value.docType === IMAGE ? (
        <MediaThumbnail.Image
          id={value?.docId}
          imageStyles="object-cover pointer-events-none"
        />
      ) : (
        <MediaThumbnail.Video id={value?.docId} />
      )}
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary -mt-8">
          Remove
        </span>
        <button
          type="button"
          aria-label="Remove"
          // eslint-disable-next-line react/no-unknown-property
          tooltip="Remove"
          className="border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
          onClick={(event) => resetMedia(event)}
        >
          {getIcon('Close', 'fill-current h-5 w-5')}
        </button>
      </div>
    </div>
  ) : (
    <div className="block">
      <button
        type="button"
        className={FRAGMENT_BUTTON_STYLES}
        onClick={() => setMediaChoiceModalOpen(true)}
      >
        {getIcon('Add', 'btn-icon')}
        <span>Add Media</span>
      </button>

      {/* Choose between doc types Modal */}

      <Modal.Presentation
        isOpen={mediaChoiceModalOpen}
        closeHandler={() => setMediaChoiceModalOpen(false)}
      >
        <div className="mx-auto rounded-lg overflow-hidden bg-gray-50 p-8 m-8 mt-0">
          <h2 className="mb-4">What kind of file do you want to add?</h2>
          <button
            type="button"
            className={FRAGMENT_BUTTON_STYLES}
            onClick={() => mediaChoiceButtonClicked(IMAGE)}
          >
            {getIcon('Images', 'btn-icon')}
            <span>Add Image</span>
          </button>
          <button
            type="button"
            className={FRAGMENT_BUTTON_STYLES}
            onClick={() => mediaChoiceButtonClicked(VIDEO)}
          >
            {getIcon('Video', 'btn-icon')}
            <span>Add Video</span>
          </button>
        </div>
      </Modal.Presentation>

      {/* Add Media Modal */}
      <Modal.Presentation
        isOpen={addMediaModalOpen}
        closeHandler={() => setAddMediaModalOpen(false)}
        isDashboard
      >
        <div className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-hidden bg-gray-50 p-4">
          <MediaCrud.Container
            savedMedia={[value]}
            updateSavedMedia={chooseMediaHandler}
            docType={docType}
            maxFiles={1}
          />
        </div>
      </Modal.Presentation>
    </div>
  )
}

const { func, object, string } = PropTypes

SelectOneMedia.propTypes = {
  label: string,
  nameId: string,
  control: object,
  errors: object,
  helpText: object,
}

SelectOneButton.propTypes = {
  value: object,
  onChange: func,
}

export default SelectOneMedia

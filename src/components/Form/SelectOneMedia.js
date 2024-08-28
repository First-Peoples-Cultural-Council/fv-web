import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'
import Modal from 'components/Modal'
import AddMediaModal from 'components/AddMediaModal'
import { IMAGE, VIDEO } from 'common/constants'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'

const DEFAULT_MEDIA_VALUE = {
  docId: '',
  docType: '',
}

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
      <XButton onClickHandler={(event) => resetMedia(event)} />
    </div>
  ) : (
    <div className="block">
      <FieldButton
        label="Add Media"
        onClickHandler={() => setMediaChoiceModalOpen(true)}
      />
      {/* Choose between doc types Modal */}
      <Modal.Presentation
        isOpen={mediaChoiceModalOpen}
        closeHandler={() => setMediaChoiceModalOpen(false)}
      >
        <div className="mx-auto rounded-lg overflow-hidden bg-gray-50 p-8 m-8 mt-0">
          <h2 className="mb-4">What kind of file do you want to add?</h2>
          <div className="space-x-2">
            <FieldButton
              label="Add Image"
              iconId="Images"
              onClickHandler={() => mediaChoiceButtonClicked(IMAGE)}
            />

            <FieldButton
              label="Add Video"
              iconId="Video"
              onClickHandler={() => mediaChoiceButtonClicked(VIDEO)}
            />
          </div>
        </div>
      </Modal.Presentation>

      <AddMediaModal.Container
        isDashboard
        savedMedia={[value]}
        updateSavedMedia={chooseMediaHandler}
        type={docType}
        modalOpen={addMediaModalOpen}
        closeModal={() => setAddMediaModalOpen(false)}
        maxFiles={1}
      />
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

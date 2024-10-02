import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'
import Modal from 'components/Modal'
import AddImageModal from 'components/AddImageModal'
import AddVideoModal from 'components/AddVideoModal'
import { IMAGE, VIDEO } from 'common/constants'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function SelectOneMedia({ label, nameId, control, errors, helpText }) {
  return (
    <div data-testid="SelectOneMedia">
      <FieldLabel nameId={nameId} text={label} />
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <SelectOneButton value={value} onChange={onChange} />
        )}
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </div>
  )
}

function SelectOneButton({ value, onChange }) {
  const [type, setType] = useState(null)

  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false)
  const [mediaChoiceModalOpen, setMediaChoiceModalOpen] = useState(false)

  const resetMedia = (event) => {
    event.preventDefault()
    // Clear out values
    if (value.id) {
      setType(null)
      onChange('')
    }
  }

  const chooseMediaHandler = (mediaArray) => {
    const firstItem = mediaArray?.[0]
    if (isUUID(firstItem?.id)) {
      const newMediaObj = {
        ...firstItem,
        type,
      }
      onChange(newMediaObj)
    }
    setAddMediaModalOpen(false)
  }

  const mediaChoiceButtonClicked = (typeChosen) => {
    setType(typeChosen)
    setMediaChoiceModalOpen(false)
    setAddMediaModalOpen(true)
  }

  return value?.id ? (
    <div className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      {value.type === IMAGE ? (
        <MediaThumbnail.Image
          id={value?.id}
          imageStyles="object-cover pointer-events-none"
        />
      ) : (
        <MediaThumbnail.Video id={value?.id} />
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
        <div
          id="media-choice-modal"
          className="mx-auto rounded-lg overflow-hidden bg-gray-50 p-8"
        >
          <h2 className="text-2xl font-bold text-fv-charcoal mb-4">
            What kind of file do you want to add?
          </h2>
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

      {type === IMAGE ? (
        <AddImageModal.Container
          savedMedia={[value]}
          updateSavedMedia={chooseMediaHandler}
          modalOpen={addMediaModalOpen}
          closeModal={() => setAddMediaModalOpen(false)}
          maxFiles={1}
        />
      ) : (
        <AddVideoModal.Container
          savedMedia={[value]}
          updateSavedMedia={chooseMediaHandler}
          modalOpen={addMediaModalOpen}
          closeModal={() => setAddMediaModalOpen(false)}
          maxFiles={1}
        />
      )}
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

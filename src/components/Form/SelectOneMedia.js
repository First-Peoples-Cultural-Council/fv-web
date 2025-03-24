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
      onChange(null)
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
          imageObject={value}
          imageStyles="object-cover pointer-events-none"
        />
      ) : (
        <MediaThumbnail.Video videoObject={value} />
      )}
      <XButton onClickHandler={(event) => resetMedia(event)} />
    </div>
  ) : (
    <div className="block">
      <FieldButton
        label="Add Media"
        onClickHandler={() => setMediaChoiceModalOpen(true)}
      />
      {/* Choose between types Modal */}
      <Modal.Presentation
        isOpen={mediaChoiceModalOpen}
        closeHandler={() => setMediaChoiceModalOpen(false)}
      >
        <div
          id="media-choice-modal"
          className="mx-auto rounded-lg overflow-hidden bg-charcoal-50 p-8"
        >
          <h2 className="text-2xl font-bold text-charcoal-900 mb-4">
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
          formMedia={[value]}
          updateFormMedia={chooseMediaHandler}
          modalOpen={addMediaModalOpen}
          closeModal={() => setAddMediaModalOpen(false)}
          maxItems={1}
        />
      ) : (
        <AddVideoModal.Container
          formMedia={[value]}
          updateFormMedia={chooseMediaHandler}
          modalOpen={addMediaModalOpen}
          closeModal={() => setAddMediaModalOpen(false)}
          maxItems={1}
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

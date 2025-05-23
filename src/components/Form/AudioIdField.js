import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

// FPCC
import AddAudioModal from 'components/AddAudioModal'
import MediaThumbnail from 'components/MediaThumbnail'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function AudioIdField({ label = '', nameId, helpText, control, errors }) {
  return (
    <Fragment key={`${nameId}_AudioIdField`}>
      <FieldLabel nameId={nameId} text={label} />
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <AudioIdFieldButton value={value} onChange={onChange} />
        )}
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

function AudioIdFieldButton({ value, onChange }) {
  const [modalOpen, setModalOpen] = useState(false)

  const updateFormMedia = (id) => {
    if (isUUID(id[0])) {
      onChange(id[0])
    }
    setModalOpen(false)
  }

  return value ? (
    <div className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      <MediaThumbnail.Audio id={value} />
      <XButton onClickHandler={() => onChange('')} />
    </div>
  ) : (
    <Fragment key="AudioIdFieldButton">
      <FieldButton
        label="Add Audio"
        onClickHandler={() => setModalOpen(true)}
      />
      <AddAudioModal.Container
        formMedia={[value]}
        updateFormMedia={updateFormMedia}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        maxItems={1}
      />
    </Fragment>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
AudioIdField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  errors: object,
}

AudioIdFieldButton.propTypes = {
  value: string,
  onChange: func,
}

export default AudioIdField

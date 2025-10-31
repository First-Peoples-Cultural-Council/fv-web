import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { TYPE_PHRASE, TYPE_WORD } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { MAX_AUDIO_BASIC, MAX_RELATED_ENTRIES } from 'common/constants/limits'

function CharacterCrudPresentation({ backHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    relatedAudio: definitions.objectArray(),
    relatedDocuments: definitions.objectArray(),
    relatedImages: definitions.objectArray(),
    relatedVideos: definitions.objectArray(),
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
    relatedDictionaryEntries: definitions.objectArray(),
    note: definitions.paragraph({ charCount: 120 }),
  })

  const defaultValues = {
    relatedAudio: [],
    relatedDocuments: [],
    relatedImages: [],
    relatedVideos: [],
    relatedVideoLinks: [],
    relatedDictionaryEntries: [],
    note: '',
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="CharacterCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={`Edit your character - ${dataToEdit?.title}`}
        subtitle="Edit media for your alphabet character."
      />
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Form.EntryArrayField
              label="Related content"
              nameId="relatedDictionaryEntries"
              control={control}
              errors={errors}
              register={register}
              helpText="Words and phrases related to your alphabet character"
              maxItems={MAX_RELATED_ENTRIES}
              types={[TYPE_WORD, TYPE_PHRASE]}
            />
          </div>
          <div className="col-span-12">
            <Form.AudioArrayField
              label="Audio"
              nameId="relatedAudio"
              control={control}
              errors={errors}
              maxItems={MAX_AUDIO_BASIC}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.ImageArrayField
              label="Image"
              nameId="relatedImages"
              control={control}
              errors={errors}
              maxItems={1}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.VideoArrayField
              label="Video"
              nameId="relatedVideos"
              control={control}
              errors={errors}
              maxItems={1}
            />
          </div>
          <div className="col-span-12">
            <Form.DocumentArrayField
              label="Document"
              nameId="relatedDocuments"
              control={control}
              errors={errors}
              maxItems={1}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Notes"
              nameId="note"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel="Save changes"
              submitIcon="Save"
              cancelIcon="Close"
              cancelLabel="Cancel"
              onCancelClick={backHandler}
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

CharacterCrudPresentation.propTypes = {
  backHandler: func,
  submitHandler: func,
  dataToEdit: object,
}

export default CharacterCrudPresentation

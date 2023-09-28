import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { AUDIO, IMAGE, VIDEO, TYPE_PHRASE, TYPE_WORD } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function CharacterCrudPresentation({ backHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    relatedAudio: definitions.idArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
    relatedDictionaryEntries: definitions.objectArray(),
    generalNote: definitions.paragraph({ charCount: 120 }),
  })

  const defaultValues = {
    relatedAudio: [],
    relatedImages: [],
    relatedVideos: [],
    relatedDictionaryEntries: [],
    generalNote: '',
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
              label="Related Content"
              nameId="relatedDictionaryEntries"
              control={control}
              register={register}
              helpText="Words and phrases related to your alphabet character"
              maxItems={10}
              types={[TYPE_WORD, TYPE_PHRASE]}
            />
            {errors?.relatedDictionaryEntries && (
              <div className="text-red-500">
                {errors?.relatedDictionaryEntries?.[0]?.message}
              </div>
            )}
          </div>
          <div className="col-span-12">
            <Form.MediaArrayField
              label="Audio"
              nameId="relatedAudio"
              control={control}
              type={AUDIO}
              maxItems={3}
            />
            {errors?.relatedAudio && (
              <div className="text-red-500">
                {errors?.relatedAudio?.[0]?.message}
              </div>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.MediaArrayField
              label="Image"
              nameId="relatedImages"
              control={control}
              type={IMAGE}
              maxItems={1}
            />
            {errors?.relatedImages && (
              <div className="text-red-500">
                {errors?.relatedImages?.[0]?.message}
              </div>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.MediaArrayField
              label="Video"
              nameId="relatedVideos"
              control={control}
              type={VIDEO}
              maxItems={1}
            />
            {errors?.relatedVideos && (
              <div className="text-red-500">
                {errors?.relatedVideos?.[0]?.message}
              </div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Notes"
              nameId="generalNote"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel="Save Changes"
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

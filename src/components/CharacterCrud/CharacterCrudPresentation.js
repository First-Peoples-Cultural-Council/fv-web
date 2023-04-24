import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { DOC_AUDIO, DOC_IMAGE, DOC_PHRASE, DOC_VIDEO, DOC_WORD } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/useEditForm'

function CharacterCrudPresentation({ backHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    relatedAssets: definitions.idArray(),
    relatedAudio: definitions.idArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
    relatedWords: definitions.idArray(),
    generalNote: definitions.paragraph({ charCount: 120 }),
  })

  const defaultValues = {
    relatedAssets: [],
    relatedAudio: [],
    relatedImages: [],
    relatedVideos: [],
    relatedWords: [],
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
        subtitle={'Edit media for your alphabet character.'}
      />
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Form.MultitypeDocumentArrayField
              label="Related Content"
              nameId="relatedAssets"
              control={control}
              helpText="Words and phrases related to your alphabet character"
              docTypes={[DOC_WORD, DOC_PHRASE]}
              docCountLimit={10}
            />
            {errors?.relatedWords && <div className="text-red-500">{errors?.relatedWords?.message}</div>}
          </div>
          <div className="col-span-12">
            <Form.DocumentArrayField
              label="Audio"
              nameId="relatedAudio"
              control={control}
              docType={DOC_AUDIO}
              docCountLimit={3}
            />
            {errors?.relatedAudio && <div className="text-red-500">{errors?.relatedAudio?.message}</div>}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.DocumentArrayField
              label="Image"
              nameId="relatedImages"
              control={control}
              docType={DOC_IMAGE}
              docCountLimit={1}
            />
            {errors?.relatedImages && <div className="text-red-500">{errors?.relatedImages?.message}</div>}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.DocumentArrayField
              label="Video"
              nameId="relatedVideos"
              control={control}
              docType={DOC_VIDEO}
              docCountLimit={1}
            />
            {errors?.relatedVideos && <div className="text-red-500">{errors?.relatedVideos?.message}</div>}
          </div>
          <div className="col-span-12">
            <Form.TextField label="Notes" nameId="generalNote" register={register} />
            {errors?.generalNote && <div className="text-red-500">{errors?.generalNote?.message}</div>}
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

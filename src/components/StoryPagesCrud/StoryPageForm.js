import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { AUDIO, VIDEO, IMAGE } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { EditorState } from 'draft-js'

function StoryPageForm({
  cancelHandler,
  dataToEdit,
  nextPageOrderNumber,
  pageNumber,
  submitHandler,
}) {
  const validator = yup.object().shape({
    text: definitions.wysiwyg({ charCount: 5000 }),
    textTranslation: definitions.wysiwyg({ charCount: 5000 }),
    notes: definitions.textArray({ charCount: 500 }),
    relatedAudio: definitions.idArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
  })

  const defaultValues = {
    id: '',
    text: EditorState.createEmpty(),
    textTranslation: EditorState.createEmpty(),
    notes: [],
    relatedAudio: [],
    relatedImages: [],
    relatedVideos: [],
    ordering: nextPageOrderNumber,
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="StoryPageForm" className="bg-white">
      <form onReset={reset}>
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-1">{pageNumber}</div>

          <div className="hidden">
            <input id="id" name="id" type="hidden" {...register('id')} />
            <input
              id="ordering"
              name="ordering"
              type="hidden"
              {...register('ordering')}
            />
          </div>
          <div className="col-span-7 space-y-4">
            <div className="w-full">
              <Form.WysiwygField
                label="Page Text"
                nameId="text"
                control={control}
                toolbar="none"
                errors={errors}
              />
            </div>
            <div className="w-full">
              <Form.WysiwygField
                label="Translation to English"
                nameId="textTranslation"
                control={control}
                toolbar="none"
                errors={errors}
              />
            </div>
            <div className="w-full">
              <Form.MediaArrayField
                label="Audio"
                nameId="relatedAudio"
                control={control}
                type={AUDIO}
                maxItems={3}
              />
              {errors?.relatedAudio && (
                <div className="text-red-500">{errors?.audio?.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <Form.MediaArrayField
                label="Videos"
                nameId="relatedVideos"
                control={control}
                type={VIDEO}
                maxItems={1}
              />
              {errors?.relatedVideos && (
                <div className="text-red-500">
                  {errors?.relatedVideos?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.MediaArrayField
                label="Images"
                nameId="relatedImages"
                control={control}
                type={IMAGE}
                maxItems={1}
              />
              {errors?.relatedImages && (
                <div className="text-red-500">
                  {errors?.relatedImages?.message}
                </div>
              )}
            </div>
            <div className="w-full">
              <Form.TextArrayField
                label="Notes"
                nameId="notes"
                register={register}
                control={control}
                errors={errors}
                maxItems={1}
              />
            </div>
          </div>

          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel="Save"
              submitIcon="Save"
              cancelIcon="Close"
              cancelLabel="Cancel"
              onCancelClick={cancelHandler}
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

// PROPTYPES
const { func, number, object, string } = PropTypes

StoryPageForm.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  nextPageOrderNumber: number,
  pageNumber: string,
  submitHandler: func,
}

export default StoryPageForm

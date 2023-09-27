import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { DOC_AUDIO } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { EditorState } from 'draft-js'

function StoryPageForm({ cancelHandler, page, pageNumber, submitHandler }) {
  const validator = yup.object().shape({
    text: definitions.wysiwyg({ charCount: 1200 }),
    textTranslation: definitions.wysiwyg({ charCount: 1200 }),
    notes: yup.array().of(yup.string()),
    audio: definitions.idArray(),
  })

  const defaultValues = {
    id: '',
    text: EditorState.createEmpty(),
    textTranslation: EditorState.createEmpty(),
    notes: [],
    audio: [],
    images: [],
    videos: [],
    visualMedia: {},
    pageNumber: '',
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit: page,
  })

  return (
    <div id="StoryPageForm" className="bg-white">
      <form onReset={reset}>
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-1">{pageNumber}</div>

          <div className="hidden">
            <input id="id" name="id" type="hidden" {...register('id')} />
          </div>
          <div className="col-span-4">
            <Form.SelectOneMedia
              label="Add Media"
              nameId="visualMedia"
              control={control}
            />
            {errors?.visualMedia && (
              <div className="text-red-500">{errors?.visualMedia?.message}</div>
            )}
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
                nameId="audio"
                control={control}
                type={DOC_AUDIO}
                maxItems={3}
              />
              {errors?.relatedAudio && (
                <div className="text-red-500">{errors?.audio?.message}</div>
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
const { func, object, string } = PropTypes

StoryPageForm.propTypes = {
  cancelHandler: func,
  submitHandler: func,
  page: object,
  pageNumber: string,
}

export default StoryPageForm

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { DOC_AUDIO } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function StoryPageForm({ cancelHandler, page, pageNumber, submitHandler }) {
  const validator = yup.object().shape({
    text: definitions.wysiwyg({ charCount: 1200 }),
    textTranslation: definitions.wysiwyg({ charCount: 1200 }),
    notes: yup.array().of(yup.string()),
    audio: definitions.idArray(),
  })

  const defaultValues = {
    id: '',
    text: '',
    textTranslation: '',
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
            <Form.SelectOne
              label="Add Media"
              nameId="visualMedia"
              control={control}
            />
            {errors?.selectOne && (
              <div className="text-red-500">{errors?.selectOne?.message}</div>
            )}
          </div>
          <div className="col-span-7 space-y-4">
            <div className="w-full">
              <Form.WysiwygField
                label="Page Text"
                nameId="text"
                control={control}
                toolbar="none"
              />
              {errors?.text && (
                <div className="text-red-500">{errors?.text?.message}</div>
              )}
            </div>
            <div className="w-full">
              <Form.WysiwygField
                label="Translation to English"
                nameId="textTranslation"
                control={control}
                toolbar="none"
              />
              {errors?.textTranslation && (
                <div className="text-red-500">
                  {errors?.textTranslation?.message}
                </div>
              )}
            </div>
            <div className="w-full">
              <Form.DocumentArrayField
                label="Audio"
                nameId="audio"
                control={control}
                docType={DOC_AUDIO}
                docCountLimit={3}
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
                maxItems={1}
              />
              {errors?.notes && (
                <div className="text-red-500">{errors?.notes?.message}</div>
              )}
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

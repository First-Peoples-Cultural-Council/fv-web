import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { EditorState } from 'draft-js'

// FPCC
import Form from 'components/Form'
import { AUDIO, VIDEO, IMAGE } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import DeleteButton from 'components/DeleteButton'

function StoryPageForm({
  cancelHandler,
  dataToEdit,
  deleteHandler,
  nextPageOrderNumber,
  pageNumber,
  submitHandler,
}) {
  const validator = yup.object().shape({
    text: definitions.wysiwygRequired({ charCount: 5000 }),
    textTranslation: definitions.wysiwyg({ charCount: 5000 }),
    notes: definitions.textArray({ charCount: 500 }),
    relatedAudio: definitions.idArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
  })

  const defaultValues = {
    id: '',
    text: EditorState.createEmpty(),
    textTranslation: EditorState.createEmpty(),
    notes: [],
    relatedAudio: [],
    relatedImages: [],
    relatedVideos: [],
    relatedVideoLinks: [],
    ordering: nextPageOrderNumber,
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="StoryPageForm" className="p-4 bg-white text-fv-charcoal">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">Edit Page {pageNumber}</div>
        {dataToEdit?.id && (
          <DeleteButton.Presentation
            deleteHandler={() => deleteHandler(dataToEdit.id)}
            label="Delete Page"
            message="Are you sure you want to delete this page from your story?"
          />
        )}
      </div>
      <form className="w-full grid grid-cols-12 gap-4" onReset={reset}>
        <div className="hidden">
          <input id="id" name="id" type="hidden" {...register('id')} />
          <input
            id="ordering"
            name="ordering"
            type="hidden"
            {...register('ordering')}
          />
        </div>
        <div className="col-span-6">
          <Form.WysiwygField
            label="Page text"
            nameId="text"
            control={control}
            toolbar="none"
            errors={errors}
          />
        </div>
        <div className="col-span-6">
          <Form.WysiwygField
            label="Page translation"
            nameId="textTranslation"
            control={control}
            toolbar="none"
            errors={errors}
          />
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
            <div className="text-red-500">{errors?.relatedVideos?.message}</div>
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
            <div className="text-red-500">{errors?.relatedImages?.message}</div>
          )}
        </div>
        <div className="col-span-12">
          <Form.TextArrayField
            label="Notes"
            nameId="notes"
            register={register}
            control={control}
            errors={errors}
            maxItems={1}
          />
        </div>

        <div className="col-span-12 flex justify-end">
          <Form.SubmitButtons
            submitLabel="Save"
            submitIcon="Save"
            cancelIcon="Close"
            cancelLabel="Cancel"
            onCancelClick={cancelHandler}
            onSubmitClick={handleSubmit(submitHandler)}
          />
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
  deleteHandler: func,
  nextPageOrderNumber: number,
  pageNumber: string,
  submitHandler: func,
}

export default StoryPageForm

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { AUDIO, VIDEO, IMAGE, PUBLIC } from 'common/constants'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import { EditorState } from 'draft-js'

function StoryCoverCrudPresentation({
  dataToEdit,
  onNextClick,
  submitHandler,
}) {
  const validator = yup.object().shape({
    title: definitions
      .paragraph({ charCount: 120 })
      .required('You must enter at least 1 character in this field.'),
    titleTranslation: definitions.translation,
    author: yup.string(),
    intro: definitions.wysiwyg({ charCount: 1200 }),
    introTranslation: definitions.wysiwyg({ charCount: 1200 }),
    relatedAudio: definitions.idArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
    acknowledgments: yup.array().of(yup.string()),
  })

  const defaultValues = {
    visibility: PUBLIC,
    // Cover
    title: '',
    titleTranslation: '',
    author: '',
    relatedVideos: [],
    relatedImages: [],
    // Introduction
    intro: EditorState.createEmpty(),
    introTranslation: EditorState.createEmpty(),
    acknowledgements: [],
    notes: [],
    relatedAudio: [],
    includeInKids: 'true',
    includeInGames: 'true',
  }

  // pageOrder

  const {
    control,
    errors,
    handleSubmit,
    isDirty,
    isValid,
    register,
    reset,
    trigger,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const stepCallback = () => {
    trigger()
    if (isValid) {
      if (isDirty) handleSubmit(submitHandler)()
      else onNextClick()
    }
  }

  return (
    <StoryCrudStepWrapper onClickCallback={stepCallback}>
      <div
        id="StoryCoverCrudPresentation"
        className="shadow rounded-md overflow-hidden bg-white"
      >
        <form onReset={reset}>
          <div className="grid grid-cols-12 gap-8 p-8">
            <div className="col-span-7 space-y-4">
              <div className="w-full">
                <Form.TextField
                  label="Title"
                  nameId="title"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <Form.TextField
                  label="Title Translation to English"
                  nameId="titleTranslation"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <Form.TextField
                  label="Author"
                  nameId="author"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12">
                <Form.WysiwygField
                  label="Story Introduction"
                  nameId="intro"
                  control={control}
                  toolbar="none"
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <Form.WysiwygField
                  label="Story Introduction Translation to English"
                  nameId="introTranslation"
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
                  <div className="text-red-500">
                    {errors?.relatedAudio?.message}
                  </div>
                )}
              </div>
              <div className="w-full">
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
              <div className="w-full">
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
                  label="Acknowledgements"
                  nameId="acknowledgements"
                  register={register}
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <Form.TextArrayField
                  label="Notes"
                  nameId="notes"
                  register={register}
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <Form.RadioButtons
                  label="Include on the Kids site?"
                  control={control}
                  errors={errors}
                  nameId="includeInKids"
                  options={[
                    { label: 'Yes', value: 'true' },
                    { label: 'No', value: 'false' },
                  ]}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </StoryCrudStepWrapper>
  )
}

// PROPTYPES
const { func, object } = PropTypes

StoryCoverCrudPresentation.propTypes = {
  submitHandler: func,
  dataToEdit: object,
  onNextClick: func,
}

export default StoryCoverCrudPresentation

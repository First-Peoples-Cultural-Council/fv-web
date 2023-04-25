import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/useEditForm'
import { DOC_AUDIO } from 'common/constants'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'

function StoryCoverCrudPresentation({ dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    title: definitions
      .paragraph({ charCount: 120 })
      .required('You must enter at least 1 character in this field.'),
    titleTranslation: definitions.translation,
    author: yup.string(),
    intro: definitions.wysiwyg({ charCount: 1200 }),
    introTranslation: definitions.wysiwyg({ charCount: 1200 }),
    audio: definitions.idArray(),
    images: definitions.idArray(),
    videos: definitions.idArray(),
    acknowledgments: yup.array().of(yup.string()),
  })

  const defaultValues = {
    visibility: 'public',
    // Cover
    title: '',
    titleTranslation: [],
    author: '',
    videos: [],
    images: [],
    cover: {},
    // Introduction
    intro: '',
    introTranslation: '',
    acknowledgements: [],
    notes: [],
    audio: [],
    kidFriendly: 'true',
  }

  const { control, errors, handleSubmit, isValid, register, reset, trigger } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  const stepCallback = () => {
    trigger()
    if (isValid) {
      // For now, always save before moving to Story Pages ensuring that the cover has been converted to V2
      // otherwise reordering pages will set the cover to modifiedv2 without the cover having been converted
      handleSubmit(submitHandler)()
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
                />
                {errors?.title && (
                  <div className="text-red-500">{errors?.title?.message}</div>
                )}
              </div>
              <div className="w-full">
                <Form.TranslationArrayField
                  label="Title Translation to English"
                  nameId="titleTranslation"
                  maxItems={1}
                  register={register}
                  control={control}
                  hideLabel
                />
                {errors?.titleTranslation && (
                  <div className="text-red-500">
                    {errors?.titleTranslation?.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <Form.TextField
                  label="Author"
                  nameId="author"
                  register={register}
                />
                {errors?.author && (
                  <div className="text-red-500">{errors?.author?.message}</div>
                )}
              </div>
              <div className="col-span-12">
                <Form.WysiwygField
                  label="Story Introduction"
                  nameId="intro"
                  control={control}
                  toolbar="none"
                />
                {errors?.intro && (
                  <div className="text-red-500">{errors?.intro?.message}</div>
                )}
              </div>
              <div className="w-full">
                <Form.WysiwygField
                  label="Story Introduction Translation to English"
                  nameId="introTranslation"
                  control={control}
                  toolbar="none"
                />
                {errors?.introTranslation && (
                  <div className="text-red-500">
                    {errors?.introTranslation?.message}
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
                  label="Acknowledgements"
                  nameId="acknowledgements"
                  register={register}
                  control={control}
                />
                {errors?.acknowledgments && (
                  <div className="text-red-500">
                    {errors?.acknowledgments?.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <Form.TextArrayField
                  label="Notes"
                  nameId="notes"
                  register={register}
                  control={control}
                />
                {errors?.notes && (
                  <div className="text-red-500">{errors?.notes?.message}</div>
                )}
              </div>
              <div className="w-full">
                <Form.RadioButtons
                  label="Include on the Kids site?"
                  control={control}
                  errors={errors}
                  nameId="kidFriendly"
                  options={[
                    { label: 'Yes', value: 'true' },
                    { label: 'No', value: 'false' },
                  ]}
                />
              </div>
            </div>
            <div className="col-span-5 space-y-4">
              <Form.SelectOne
                label="Add a Cover Media"
                nameId="cover"
                control={control}
              />
              {errors?.selectOne && (
                <div className="text-red-500">{errors?.selectOne?.message}</div>
              )}
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
}

export default StoryCoverCrudPresentation

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { VIDEO, TEAM } from 'common/constants'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import { EditorState } from 'draft-js'

function StoryCoverCrudPresentation({ dataToEdit, submitHandler }) {
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
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
    acknowledgments: yup.array().of(yup.string()),
  })

  const defaultValues = {
    visibility: TEAM, // Default for new stories should be team only - visibility can be changed after the user has had an opportunity to add pages
    // Cover
    title: '',
    titleTranslation: '',
    author: '',
    relatedVideos: [],
    relatedVideoLinks: [],
    relatedImages: [],
    // Introduction
    intro: EditorState.createEmpty(),
    introTranslation: EditorState.createEmpty(),
    acknowledgements: [],
    notes: [],
    relatedAudio: [],
    includeInKids: 'true',
    includeInGames: 'true',
    hideOverlay: 'false',
  }

  // pageOrder

  const { control, errors, handleSubmit, isValid, register, reset, trigger } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  const stepCallback = () => {
    trigger()
    if (isValid) {
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
            <div className="hidden">
              <input
                id="includeInKids"
                name="includeInKids"
                type="hidden"
                {...register('includeInKids')}
              />
              <input
                id="visibility"
                name="visibility"
                type="hidden"
                {...register('visibility')}
              />
            </div>
            <div className="col-span-6">
              <Form.TextField
                label="Title in your language"
                nameId="title"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-6">
              <Form.TextField
                label="Title translation"
                nameId="titleTranslation"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.TextField
                label="Author"
                nameId="author"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-6">
              <Form.WysiwygField
                label="Introduction in your language"
                nameId="intro"
                control={control}
                toolbar="none"
                errors={errors}
              />
            </div>
            <div className="col-span-6">
              <Form.WysiwygField
                label="Introduction translation"
                nameId="introTranslation"
                control={control}
                toolbar="none"
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.AudioArrayField
                label="Audio"
                nameId="relatedAudio"
                control={control}
                errors={errors}
                maxItems={3}
              />
            </div>
            <div className="col-span-12">
              <Form.MediaArrayField
                label="Videos"
                nameId="relatedVideos"
                control={control}
                errors={errors}
                type={VIDEO}
                maxItems={1}
              />
            </div>
            <div className="col-span-12">
              <Form.ImageArrayField
                label="Images"
                nameId="relatedImages"
                control={control}
                errors={errors}
                maxItems={1}
              />
            </div>

            <div className="col-span-12">
              <Form.TextArrayField
                label="Acknowledgements"
                nameId="acknowledgements"
                register={register}
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.TextArrayField
                label="Notes"
                nameId="notes"
                register={register}
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-span-8">
              <Form.RadioButtons
                label="Does the cover image include the title?"
                helpText="Selecting 'Yes' will hide the title overlay in the story list"
                control={control}
                errors={errors}
                nameId="hideOverlay"
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
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

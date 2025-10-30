import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { PUBLIC } from 'common/constants'
import {
  MAX_AUDIO,
  MAX_VIDEOS,
  MAX_IMAGES,
  MAX_DOCUMENTS,
  MAX_ACKNOWLEDGEMENTS,
  MAX_NOTES,
  MAX_LYRICS,
} from 'common/constants/limits'

function SongCrudPresentation({
  backHandler,
  dataToEdit,
  deleteHandler,
  submitHandler,
}) {
  const validator = yup.object().shape({
    title: definitions.title().required('A title is required'),
    titleTranslation: definitions.paragraph(),
    intro: definitions.wysiwyg({ charCount: 1200 }),
    introTranslation: definitions.wysiwyg({ charCount: 1200 }),
    lyrics: yup.array().of(
      yup.object().shape({
        text: definitions.paragraph({ charCount: 5000 }),
        translation: definitions.paragraph({ charCount: 5000 }),
      }),
    ),
    acknowledgments: definitions.textArray({ charCount: 500 }),
    notes: definitions.textArray({ charCount: 500 }),
    relatedAudio: definitions.objectArray(),
    relatedDocuments: definitions.objectArray(),
    relatedImages: definitions.objectArray(),
    relatedVideos: definitions.objectArray(),
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
  })

  const defaultValues = {
    title: '',
    titleTranslation: '',
    intro: '',
    introTranslation: '',
    lyrics: [],
    acknowledgements: [],
    notes: [],
    relatedAudio: [],
    relatedDocuments: [],
    relatedImages: [],
    relatedVideos: [],
    relatedVideoLinks: [],
    includeInKids: 'true',
    includeInGames: 'true',
    visibility: PUBLIC,
    hideOverlay: 'false',
  }

  const {
    control,
    errors,
    handleSubmit,
    isCreateMode,
    register,
    reset,
    resetField,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="SongCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={isCreateMode ? 'Create a new song' : 'Edit your song'}
        subtitle={isCreateMode ? 'Enter the details for your new song.' : ''}
      />
      {!isCreateMode && (
        <div className="w-full flex justify-end mt-6 px-6">
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label="Delete Song"
            message="Are you sure you want to delete this song from your site?"
          />
        </div>
      )}
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField
              label="Title in your language"
              nameId="title"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField
              label="Title translation"
              nameId="titleTranslation"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <Form.WysiwygField
              label="Introduction in your language"
              nameId="intro"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <Form.WysiwygField
              label="Introduction translation"
              nameId="introTranslation"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.AudioArrayField
              label="Audio"
              nameId="relatedAudio"
              control={control}
              errors={errors}
              maxItems={MAX_AUDIO}
            />
          </div>
          <div className="col-span-12">
            <Form.TextTranslationArrayField
              label="Lyrics"
              nameId="lyrics"
              register={register}
              control={control}
              errors={errors}
              maxItems={MAX_LYRICS}
            />
          </div>
          <div className="col-span-6">
            <Form.ImageArrayField
              label="Images"
              nameId="relatedImages"
              control={control}
              errors={errors}
              maxItems={MAX_IMAGES}
            />
          </div>
          <div className="col-span-6">
            <Form.VideoArrayField
              label="Videos"
              nameId="relatedVideos"
              control={control}
              errors={errors}
              maxItems={MAX_VIDEOS}
            />
          </div>
          <div className="col-span-12">
            <Form.DocumentArrayField
              label="Documents"
              nameId="relatedDocuments"
              control={control}
              errors={errors}
              maxItems={MAX_DOCUMENTS}
            />
          </div>
          <div className="col-span-12">
            <Form.TextArrayField
              label="Notes"
              nameId="notes"
              register={register}
              control={control}
              errors={errors}
              maxItems={MAX_NOTES}
            />
          </div>
          <div className="col-span-12">
            <Form.TextArrayField
              label="Acknowledgements"
              nameId="acknowledgements"
              register={register}
              control={control}
              errors={errors}
              maxItems={MAX_ACKNOWLEDGEMENTS}
            />
          </div>
          <div className="col-span-12">
            <Form.Visibility
              control={control}
              errors={errors}
              resetField={resetField}
            />
          </div>
          <div className="col-span-6">
            <Form.IncludeInKids control={control} errors={errors} />
          </div>
          <div className="col-span-6">
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
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Create song' : 'Save changes'}
              submitIcon={isCreateMode ? 'Add' : 'Save'}
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

SongCrudPresentation.propTypes = {
  backHandler: func,
  deleteHandler: func,
  submitHandler: func,
  dataToEdit: object,
}

export default SongCrudPresentation

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { EditorState } from 'draft-js'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { AUDIO, IMAGE, VIDEO, PUBLIC, TEAM } from 'common/constants'
import { useParams } from 'react-router-dom'
import { useUserStore } from 'context/UserContext'
import { ASSISTANT } from '../../common/constants/roles'

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
    relatedAudio: definitions.idArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
  })

  const { sitename } = useParams()
  const { user } = useUserStore()
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''
  const isAssistant = userSiteRole === ASSISTANT

  const defaultValues = {
    title: '',
    titleTranslation: '',
    intro: EditorState.createEmpty(),
    introTranslation: EditorState.createEmpty(),
    lyrics: [],
    acknowledgements: [],
    notes: [],
    relatedAudio: [],
    relatedImages: [],
    relatedVideos: [],
    includeInKids: 'true',
    includeInGames: 'true',
    visibility: isAssistant ? TEAM : PUBLIC,
    hideOverlay: 'false',
  }

  const { control, errors, handleSubmit, isCreateMode, register, reset } =
    useEditForm({
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
            <Form.MediaArrayField
              label="Audio"
              nameId="relatedAudio"
              control={control}
              register={register}
              type={AUDIO}
              maxItems={10}
            />
            {errors?.relatedAudio && (
              <div className="text-red-500">
                {errors?.relatedAudio?.message}
              </div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextTranslationArrayField
              label="Lyrics"
              nameId="lyrics"
              register={register}
              control={control}
              errors={errors}
              maxItems={25}
            />
          </div>
          <div className="col-span-6">
            <Form.MediaArrayField
              label="Images"
              nameId="relatedImages"
              control={control}
              register={register}
              type={IMAGE}
              maxItems={10}
            />
            {errors?.relatedImages && (
              <div className="text-red-500">
                {errors?.relatedImages?.message}
              </div>
            )}
          </div>
          <div className="col-span-6">
            <Form.MediaArrayField
              label="Videos"
              nameId="relatedVideos"
              control={control}
              register={register}
              type={VIDEO}
              maxItems={10}
            />
            {errors?.relatedVideos && (
              <div className="text-red-500">
                {errors?.relatedVideos?.message}
              </div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextArrayField
              label="Notes"
              nameId="notes"
              register={register}
              control={control}
              errors={errors}
              maxItems={6}
            />
          </div>
          <div className="col-span-12">
            <Form.TextArrayField
              label="Acknowledgements"
              nameId="acknowledgements"
              register={register}
              control={control}
              errors={errors}
              maxItems={6}
            />
          </div>
          <div className="col-span-12">
            <Form.Visibility
              control={control}
              errors={errors}
              reduceAssistantOptions={isAssistant}
            />
          </div>
          <div className="col-span-6">
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
              cancelIcon={isCreateMode ? 'BackArrow' : 'Close'}
              cancelLabel={isCreateMode ? 'Go back' : 'Cancel'}
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

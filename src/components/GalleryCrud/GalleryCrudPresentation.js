import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function GalleryCrudPresentation({
  backHandler,
  dataToEdit,
  deleteHandler,
  submitHandler,
}) {
  const validator = yup.object().shape({
    title: definitions
      .title({ charCount: 150 })
      .required('A title is required'),
    titleTranslation: definitions.title({ charCount: 150 }),
    intro: definitions.paragraph(),
    introTranslation: definitions.paragraph(),
    galleryItems: definitions.idArray(),
    coverImage: definitions.uuid(),
  })

  const defaultValues = {
    title: '',
    titleTranslation: '',
    intro: '',
    introTranslation: '',
    galleryItems: [],
    coverImage: '',
  }

  const { control, errors, handleSubmit, isCreateMode, register, reset } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div id="GalleryCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={isCreateMode ? 'Create a new gallery' : 'Edit your gallery'}
        subtitle={isCreateMode ? 'Enter the details for your new gallery.' : ''}
      />
      {!isCreateMode && (
        <div className="w-full flex justify-end mt-6 px-6">
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label="Delete Gallery"
            message="Are you sure you want to delete this gallery from your site?"
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
              label="Title Translation"
              nameId="titleTranslation"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextAreaField
              label="Introduction in your language"
              nameId="intro"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextAreaField
              label="Introduction translation"
              nameId="introTranslation"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <Form.ImageIdField
              label="Cover image"
              nameId="coverImage"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.ImageArrayField
              label="Gallery Images"
              nameId="galleryItems"
              control={control}
              errors={errors}
              maxItems={50}
            />
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Create gallery' : 'Save changes'}
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

GalleryCrudPresentation.propTypes = {
  backHandler: func,
  deleteHandler: func,
  submitHandler: func,
  dataToEdit: object,
}

export default GalleryCrudPresentation

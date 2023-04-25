import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import useEditForm from 'common/useEditForm'
import { definitions } from 'common/utils/validationHelpers'

function SpeakerCrudPresentation({ backHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    name: definitions.title().required('A name is required'),
    bio: definitions.paragraph().required('A bio is required'),
  })

  const defaultValues = {
    name: '',
    bio: '',
  }

  const { errors, handleSubmit, isCreateMode, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="SpeakerCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={isCreateMode ? 'Add a new speaker' : 'Edit a speaker'}
        subtitle={isCreateMode ? 'Enter the details for the new speaker.' : ''}
      />
      {!isCreateMode && (
        <div className="w-full flex justify-end mt-6 px-6">
          <DeleteButton.Container
            id={dataToEdit?.id}
            label="Delete Speaker"
            message="Are you sure you want to delete this speaker from your site?"
          />
        </div>
      )}
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField label="Name" nameId="name" register={register} />
            {errors?.name && (
              <div className="text-red-500">{errors?.name?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField label="Bio" nameId="bio" register={register} />
            {errors?.bio && (
              <div className="text-red-500">{errors?.bio?.message}</div>
            )}
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Add Speaker' : 'Save Changes'}
              submitIcon={isCreateMode ? 'Add' : 'Save'}
              cancelIcon={isCreateMode ? 'BackArrow' : 'Close'}
              cancelLabel={isCreateMode ? 'Go Back' : 'Cancel'}
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
const { func, object, string } = PropTypes

SpeakerCrudPresentation.propTypes = {
  backHandler: func,
  speakersDirectoryId: string,
  submitHandler: func,
  dataToEdit: object,
}

export default SpeakerCrudPresentation

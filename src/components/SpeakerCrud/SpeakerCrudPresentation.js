import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'

function SpeakerCrudPresentation({
  backHandler,
  dataToEdit,
  submitHandler,
  deleteHandler,
}) {
  const validator = yup.object().shape({
    name: definitions.title().required('A name is required'),
    bio: definitions
      .paragraph({ charCount: 1000 })
      .required('A bio is required'),
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
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label="Delete speaker"
            message="Are you sure you want to delete this speaker from your site?"
            note="This will remove the speaker from all associated audio files."
          />
        </div>
      )}
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField
              label="Name"
              nameId="name"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextAreaField
              label="Biography"
              nameId="bio"
              helpText="Add a short bio for this speaker."
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Add Speaker' : 'Save Changes'}
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

SpeakerCrudPresentation.propTypes = {
  backHandler: func,
  deleteHandler: func,
  submitHandler: func,
  dataToEdit: object,
}

export default SpeakerCrudPresentation

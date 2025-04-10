import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import AudioNative from 'components/AudioNative'
import AudioBaseForm from 'components/AudioCrud/AudioBaseForm'

function AudioEditForm({
  dataToEdit,
  speakerOptions,
  submitHandler,
  backHandler,
}) {
  const validator = yup.object().shape({
    original: null,
    title: definitions
      .title({ charCount: 225 })
      .required('You must enter at least 1 character in this field.'),
    description: definitions.paragraph(),
    acknowledgement: definitions.paragraph(),
  })

  const defaultValues = {
    title: '',
    description: '',
    acknowledgement: '',
    speakers: [],
    includeInGames: 'true',
    includeInKids: 'true',
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="AudioEditForm" className="max-w-5xl p-8">
      <Form.Header
        title="Edit Your Audio"
        subtitle="Edit the details for your audio file."
      />
      <form onReset={reset}>
        <div className="grid grid-cols-12 py-6">
          <div className="col-span-6">
            <AudioNative styling="mt-4" audioObject={dataToEdit} />
          </div>
          <div className="grid grid-cols-12 gap-6 col-span-12">
            <AudioBaseForm
              register={register}
              errors={errors}
              control={control}
              speakerOptions={speakerOptions}
            />
            <div className="col-span-12 flex justify-end mt-6 px-6">
              <Form.SubmitButtons
                submitLabel="Save changes"
                submitIcon="Save"
                cancelIcon="Close"
                cancelLabel="Cancel"
                onCancelClick={backHandler}
                onSubmitClick={handleSubmit(submitHandler)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const { array, func, object } = PropTypes
AudioEditForm.propTypes = {
  dataToEdit: object,
  speakerOptions: array,
  submitHandler: func,
  backHandler: func,
}

export default AudioEditForm

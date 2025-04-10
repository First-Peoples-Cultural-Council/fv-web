import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { TYPE_VIDEO } from 'common/constants'

import { getMediaPath } from 'common/utils/mediaHelpers'

function VideoCrudPresentation({ dataToEdit, submitHandler, backHandler }) {
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
  }

  const { errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="VideoCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title="Edit Your Video"
        subtitle="Edit the details for your video file."
      />
      <form onReset={reset}>
        <div className="grid grid-cols-12 py-6">
          <div className="m-6 col-span-6 overflow-hidden">
            <video
              className="w-full aspect-video"
              src={getMediaPath({
                mediaObject: dataToEdit,
                type: TYPE_VIDEO,
              })}
              controls
            />
          </div>
          <div className="grid grid-cols-12 gap-6 col-span-6">
            <div className="col-span-12">
              <Form.TextField
                label="Title"
                nameId="title"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.TextAreaField
                label="Description"
                nameId="description"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.TextAreaField
                label="Acknowledgement"
                nameId="acknowledgement"
                register={register}
                errors={errors}
              />
            </div>
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

const { func, object } = PropTypes
VideoCrudPresentation.propTypes = {
  dataToEdit: object,
  submitHandler: func,
  backHandler: func,
}

export default VideoCrudPresentation

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { DOC_AUDIO } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function ImmersionCrudPresentation({ dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    immersionLabel: definitions.title().required('A label is required'),
    transKey: definitions
      .paragraph({ charCount: 100 })
      .required('A transKey is required'),
    relatedAudio: definitions.idArray(),
  })

  const defaultValues = {
    immersionLabel: '',
    transKey: '',
    relatedAudio: [],
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="ImmersionCrudPresentation" className="max-w-5xl p-8">
      {dataToEdit?.transKey ? (
        <>
          <Form.Header title="Edit Immersion Label" />
          <form onReset={reset}>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="hidden">
                <input
                  id="transKey"
                  name="transKey"
                  type="hidden"
                  {...register('transKey')}
                />
              </div>
              <div className="col-span-12">
                <Form.TextField
                  label={`Immersion Label for "${dataToEdit?.english}"`}
                  nameId="immersionLabel"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12">
                <Form.MediaArrayField
                  label="Audio"
                  nameId="relatedAudio"
                  control={control}
                  type={DOC_AUDIO}
                  maxItems={1}
                />
                {errors?.relatedAudio && (
                  <div className="text-red-500">
                    {errors?.relatedAudio?.message}
                  </div>
                )}
              </div>
              <div className="col-span-12 flex justify-end mt-6">
                <Form.SubmitButtons
                  submitLabel="Save Changes"
                  submitIcon="Save"
                  onSubmitClick={handleSubmit(submitHandler)}
                />
              </div>
            </div>
          </form>
        </>
      ) : (
        <Form.Header title="Select a label to edit" />
      )}
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

ImmersionCrudPresentation.propTypes = {
  submitHandler: func,
  dataToEdit: object,
}

export default ImmersionCrudPresentation

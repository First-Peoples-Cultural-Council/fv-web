import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// FPCC
import Form from 'components/Form'
import { DOC_AUDIO } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'

function ImmersionCrudPresentation({ dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    immersionLabel: definitions.title().required('A label is required'),
    transKey: definitions.paragraph({ charCount: 100 }).required('A transKey is required'),
    relatedAudio: definitions.idArray(),
  })

  const defaultValues = {
    immersionLabel: '',
    transKey: '',
    relatedAudio: [],
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validator),
  })

  // NB Always set existing data on load (transkey provided for new labels and needs to be set)
  useEffect(() => {
    if (dataToEdit?.transKey) {
      for (const property in dataToEdit) {
        if (Object.prototype.hasOwnProperty.call(dataToEdit, property)) {
          setValue(property, dataToEdit[property])
        }
      }
    }
  }, [dataToEdit])

  return (
    <div id="ImmersionCrudPresentation" className="max-w-5xl p-8">
      {dataToEdit?.transKey ? (
        <Fragment>
          <Form.Header title="Edit Immersion Label" />
          <form onReset={reset}>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="hidden">
                <input id="transKey" name="transKey" type="hidden" {...register('transKey')} />
              </div>
              <div className="col-span-12">
                <Form.TextField
                  label={`Immersion Label for "${dataToEdit?.english}"`}
                  nameId="immersionLabel"
                  register={register}
                />
                {errors?.immersionLabel && <div className="text-red-500">{errors?.immersionLabel?.message}</div>}
              </div>
              <div className="col-span-12">
                <Form.DocumentArrayField
                  label="Audio"
                  nameId="relatedAudio"
                  control={control}
                  docType={DOC_AUDIO}
                  docCountLimit={1}
                />
                {errors?.relatedAudio && <div className="text-red-500">{errors?.relatedAudio?.message}</div>}
              </div>
              <div className="col-span-12 flex justify-end mt-6">
                <Form.SubmitButtons
                  submitLabel={'Save Changes'}
                  submitIcon={'Save'}
                  onSubmitClick={handleSubmit(submitHandler)}
                />
              </div>
            </div>
          </form>
        </Fragment>
      ) : (
        <Form.Header title={'Select a label to edit'} />
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

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// FPCC
import Form from 'components/Form'
import { TYPE_WORD, TYPE_PHRASE } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'

function ImmersionCrudForm({ dataToEdit, site, submitHandler }) {
  const validator = yup.object().shape({
    dictionaryEntry: definitions
      .stringArray()
      .min(1, 'An entry is required for this label.'),
    transKey: definitions.paragraph({ charCount: 100 }),
  })

  const defaultValues = {
    dictionaryEntry: [],
    transKey: '',
  }

  // NB: Not using useEditForm as we need to load the transkey value even when there is no id
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

  useEffect(() => {
    Object.keys(dataToEdit).forEach((property) => {
      if (Object.hasOwn(dataToEdit, property)) {
        setValue(property, dataToEdit[property])
      }
    })
  }, [dataToEdit, setValue])

  return (
    <div id="ImmersionCrudForm">
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
            <Form.EntryArrayField
              nameId="dictionaryEntry"
              control={control}
              register={register}
              errors={errors}
              label={`Immersion label for "${dataToEdit?.english}"`}
              buttonLabel={`Select a dictionary entry to use as a label for "${dataToEdit?.english}"`}
              helpText="NB: Only dictionary entries that match the visibility of your site can be used as immersion labels."
              maxItems={1}
              types={[TYPE_WORD, TYPE_PHRASE]}
              visibility={site?.visibility}
            />
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
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

ImmersionCrudForm.propTypes = {
  submitHandler: func,
  dataToEdit: object,
  site: object,
}

export default ImmersionCrudForm

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_TEXTCONCISE, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormTextConcise({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_TEXTCONCISE]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    title: definitions.title(),
    text: definitions.paragraph({ charCount: 200 }),
    audio: definitions.uuid(),
    url: definitions.url(),
    urlLabel: definitions.label().nullable(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_TEXTCONCISE,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    title: '',
    text: '',
    audio: '',
    url: '',
    urlLabel: '',
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    errors,
    isCreateMode,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div data-testid="WidgetFormTextConcise">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        resetField={resetField}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_TEXTCONCISE}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="Title text"
              nameId="title"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Subtitle text"
              nameId="text"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <Form.AudioIdField
              label="Audio"
              nameId="audio"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="URL"
              nameId="url"
              helpText="Enter any URL you would like to link to."
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <Form.TextField
              label="URL label"
              nameId="urlLabel"
              helpText="Enter a label for the URL button."
              register={register}
              errors={errors}
            />
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormTextConcise.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormTextConcise

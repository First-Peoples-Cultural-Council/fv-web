import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/useEditForm'
import Form from 'components/Form'
import { DOC_AUDIO, WIDGET_TEXTCONCISE } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormTextConcise({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_TEXTCONCISE]),
    widgetFormat: yup.string().required().oneOf(['default']),
    title: definitions.title(),
    text: definitions.paragraph({ charCount: 200 }),
    audio: definitions.uuid(),
    url: definitions.url(),
    urlLabel: definitions.label().nullable(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_TEXTCONCISE,
    widgetFormat: 'default',
    visibility: 'public',
    title: '',
    text: '',
    audio: '',
    url: '',
    urlLabel: '',
  }

  const { register, control, handleSubmit, reset, errors, isCreateMode } =
    useEditForm({
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
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_TEXTCONCISE}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="Title Text"
              nameId="title"
              register={register}
            />
            {errors?.title && (
              <div className="text-red-500">{errors?.title?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Subtitle Text"
              nameId="text"
              register={register}
            />
            {errors?.text && (
              <div className="text-red-500">{errors?.text?.message}</div>
            )}
          </div>
          <div className="col-span-6">
            <Form.AddMedia
              label="Audio"
              nameId="audio"
              docType={DOC_AUDIO}
              control={control}
            />
            {errors?.audio && (
              <div className="text-red-500">{errors?.audio?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="URL"
              nameId="url"
              helpText="Enter any URL you would like to link to."
              register={register}
            />
            {errors?.url && (
              <div className="text-red-500">{errors?.url?.message}</div>
            )}
          </div>
          <div className="col-span-6">
            <Form.TextField
              label="URL Label"
              nameId="urlLabel"
              helpText="Enter a label for the URL button."
              register={register}
            />
            {errors?.urlLabel && (
              <div className="text-red-500">{errors?.urlLabel?.message}</div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormTextConcise.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormTextConcise

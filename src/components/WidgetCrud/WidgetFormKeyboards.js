import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/useEditForm'
import Form from 'components/Form'
import { WIDGET_KEYBOARDS } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormKeyboards({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_KEYBOARDS]),
    widgetFormat: yup.string().required().oneOf(['default']),
    macUrl: definitions.url({ required: true }),
    windowsUrl: definitions.url({ required: true }),
    chromebookUrl: definitions.url(),
    visibility: definitions.visibility(),
  })
  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_KEYBOARDS,
    widgetFormat: 'default',
    visibility: 'public',
    macUrl: '',
    windowsUrl: '',
    chromebookUrl: '',
  }
  const { control, register, handleSubmit, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormKeyboards">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_KEYBOARDS}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="MacOS URL"
              nameId="macUrl"
              register={register}
              helpText="e.g. https://keyman.com/keyboards/..."
            />
            {errors?.macUrl && (
              <div className="text-red-500">{errors?.macUrl?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Windows/PC URL"
              nameId="windowsUrl"
              register={register}
              helpText="e.g. https://keyman.com/keyboards/..."
            />
            {errors?.windowsUrl && (
              <div className="text-red-500">{errors?.windowsUrl?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Chromebook URL"
              nameId="chromebookUrl"
              register={register}
              helpText="e.g. https://chrome.google.com/webstore/detail/firstvoices-keyboards/..."
            />
            {errors?.chromebookUrl && (
              <div className="text-red-500">
                {errors?.chromebookUrl?.message}
              </div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormKeyboards.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormKeyboards

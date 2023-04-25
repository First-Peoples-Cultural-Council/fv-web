import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/useEditForm'
import Form from 'components/Form'
import { WIDGET_TEXTFULL } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormText({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_TEXTFULL]),
    widgetFormat: yup.string().required().oneOf(['default']),
    textWithFormatting: definitions.wysiwyg({ charCount: 4500 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_TEXTFULL,
    widgetFormat: 'default',
    visibility: 'public',
    textWithFormatting: '',
  }

  const { register, handleSubmit, control, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormText">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_TEXTFULL}
      >
        <div className="col-span-12">
          <Form.WysiwygField
            label="Text"
            nameId="textWithFormatting"
            control={control}
          />
          {errors?.textWithFormatting && (
            <div className="text-red-500">
              {errors?.textWithFormatting?.message}
            </div>
          )}
        </div>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormText.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormText

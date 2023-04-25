import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { DOC_IMAGE, WIDGET_TEXTICONS } from 'common/constants'
import useEditForm from 'common/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormTextIcons({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_TEXTICONS]),
    widgetFormat: yup.string().required().oneOf(['default']),
    title: definitions.title(),
    textWithFormatting: definitions.wysiwyg({ charCount: 1200 }),
    image: definitions.uuid(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_TEXTICONS,
    widgetFormat: 'default',
    visibility: 'public',
    title: '',
    textWithFormatting: '',
    image: '',
  }

  const { register, handleSubmit, control, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormTextIcons">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_TEXTICONS}
      >
        <>
          <div className="col-span-12">
            <Form.TextField label="Title" nameId="title" register={register} />
            {errors?.title && (
              <div className="text-red-500">{errors?.title?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.WysiwygField
              label="Text"
              nameId="textWithFormatting"
              control={control}
              toolbar="none"
            />
            {errors?.textWithFormatting && (
              <div className="text-red-500">
                {errors?.textWithFormatting?.message}
              </div>
            )}
          </div>
          <div className="col-span-6">
            <Form.AddMedia
              label="Image"
              nameId="image"
              docType={DOC_IMAGE}
              control={control}
            />
            {errors?.image && (
              <div className="text-red-500">{errors?.image?.message}</div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}

// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormTextIcons.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormTextIcons

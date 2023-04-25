import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_CONTACT } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormContact({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_CONTACT]),
    widgetFormat: yup.string().required().oneOf(['default']),
    title: definitions.title().required('A title is required'),
    text: definitions.paragraph(),
    textWithFormatting: definitions.wysiwyg({ charCount: 200 }),
    urls: yup.string().max(500).trim(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_CONTACT,
    widgetFormat: 'default',
    visibility: 'public',
    title: 'Contact Us',
    text: 'Please use the form below to contact our language team. We will try and get back to you as soon as possible.',
    textWithFormatting: '',
    urls: '',
  }

  const { register, handleSubmit, control, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormContact">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_CONTACT}
      >
        <>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField label="Title" nameId="title" register={register} />
            {errors?.title && (
              <div className="text-red-500">{errors?.title?.message}</div>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextAreaField
              label="Text"
              nameId="text"
              register={register}
            />
            {errors?.text && (
              <div className="text-red-500">{errors?.text?.message}</div>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.WysiwygField
              label="Address"
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
          <div className="col-span-12">
            <Form.TextField
              label="Social Media Links"
              nameId="urls"
              helpText="Enter any URLs you would like to include separated by commas."
              register={register}
            />
            {errors?.urls && (
              <div className="text-red-500">{errors?.urls?.message}</div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormContact.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormContact

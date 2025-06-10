import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_CONTACT, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'
import { useContactUsEmailList } from 'common/dataHooks/useContactUs'

function WidgetFormContact({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_CONTACT]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    title: definitions.title().required('A title is required'),
    text: definitions.paragraph(),
    textWithFormatting: definitions.wysiwyg({ charCount: 200 }),
    urls: yup.string().max(500).trim(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_CONTACT,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    title: 'CONTACT US',
    text: 'Please use the form below to contact our language team. We will try and get back to you as soon as possible.',
    textWithFormatting: '',
    urls: '',
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    errors,
    isCreateMode,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const { emailListAsString } = useContactUsEmailList()

  return (
    <div data-testid="WidgetFormContact">
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
        type={WIDGET_CONTACT}
      >
        <>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField
              label="Title"
              nameId="title"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.TextAreaField
              label="Text"
              nameId="text"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Form.WysiwygField
              label="Address"
              nameId="textWithFormatting"
              control={control}
              toolbar="none"
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Social media links"
              nameId="urls"
              helpText="Enter any URLs you would like to include separated by commas."
              register={register}
              errors={errors}
            />
          </div>
          {emailListAsString?.length > 0 ? (
            <div className="col-span-12 mt-2 text-sm text-charcoal-500">
              <div className="block text-sm font-medium text-charcoal-900">
                Contact list
              </div>
              <div className="mt-2 text-xs text-charcoal-500 italic">
                (Please contact support at hello@firstvoices.com to update this
                list)
              </div>
              <div className="mt-2 text-sm text-charcoal-500">
                Contact us emails will be sent to the following addresses:
              </div>
              <div>{emailListAsString}</div>
            </div>
          ) : (
            <div className="col-span-12">
              <div className="block text-sm font-medium text-charcoal-900">
                Contact list
              </div>
              <div className="mt-2 text-xs text-charcoal-500 italic">
                (Please contact support at hello@firstvoices.com to update this
                list)
              </div>
              <div className="mt-2 text-sm text-charcoal-500">
                Could not find any emails to send contact messages to.
              </div>
            </div>
          )}
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

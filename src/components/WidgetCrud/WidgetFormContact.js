import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Link, useParams } from 'react-router'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { INFO, WIDGET_CONTACT, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'
import { useContactUs } from 'common/dataHooks/useContactUs'
import AlertBanner from 'components/AlertBanner'

function WidgetFormContact({ cancelHandler, dataToEdit, submitHandler }) {
  const { sitename } = useParams()

  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_CONTACT]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    title: definitions.title().required('A title is required'),
    text: definitions.paragraph(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_CONTACT,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    title: 'Contact',
    text: 'Please contact us if you have any suggestions or feedback regarding our language content.',
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    formState,
    isCreateMode,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const { data } = useContactUs()

  return (
    <div data-testid="WidgetFormContact">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        formState={formState}
        register={register}
        reset={reset}
        resetField={resetField}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_CONTACT}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="Title"
              nameId="title"
              register={register}
              formState={formState}
            />
          </div>
          <div className="col-span-12">
            <Form.TextAreaField
              label="Text"
              nameId="text"
              register={register}
              formState={formState}
            />
          </div>

          <div className="col-span-12">
            <AlertBanner.Presentation
              alertType={INFO}
              message={
                <div>
                  If you had an address or links on your Contact widget they
                  have been moved to your{' '}
                  <Link
                    to={`/${sitename}/contact`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-url"
                  >
                    new Contact page
                  </Link>
                  . Please contact support at hello@firstvoices.com if you want
                  to update the information on your contact page.
                </div>
              }
            />
          </div>

          <div className="hidden col-span-12 text-charcoal-500">
            <div data-testid="contact-email-list">
              <Form.FieldLabel
                nameId="contact-email-list"
                text="Contact email list"
                helpText="Messages sent using the form on your Contact page will be
              forwarded to the following addresses. To update the list please contact hello@firstvoices.com."
              />
              {data?.emailListAsString?.length > 0 ? (
                <div className="w-full py-2 text-base font-bold">
                  {data?.emailListAsString}
                </div>
              ) : (
                <div className="w-full py-2 text-base font-bold text-scarlet-800">
                  You don&apos;t have any contact emails listed. Please contact
                </div>
              )}
            </div>
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

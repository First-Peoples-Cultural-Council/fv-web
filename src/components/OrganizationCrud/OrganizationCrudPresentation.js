import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'

function OrganizationCrudPresentation({
  backHandler,
  dataToEdit,
  submitHandler,
  deleteHandler,
}) {
  const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validator = yup.object().shape({
    name: definitions.title().required('A name is required'),
    contactMessage: definitions
      .paragraph({ charCount: 1000 })
      .required('A message is required'),
    address: definitions.wysiwyg({ charCount: 200 }),
    emails: yup.array().of(
      yup.object().shape({
        label: definitions.paragraph({ charCount: 200 }),
        value: yup
          .string()
          .email('Must be a valid email')
          .required('A valid email is required')
          .trim(),
      }),
    ),
    phoneNumbers: yup.array().of(
      yup.object().shape({
        label: definitions.paragraph({ charCount: 200 }),
        value: yup
          .string()
          .matches(phoneRegex, 'Phone number is not valid')
          .required('A number is required'),
      }),
    ),
    urlList: yup.array().of(
      yup.object().shape({
        label: definitions.paragraph({ charCount: 200 }),
        value: yup
          .string()
          .url('Must be a valid URL')
          .required('A url is required')
          .trim(),
      }),
    ),
  })

  const defaultValues = {
    name: '',
    contactMessage: '',
    address: '',
    emails: [],
    phoneNumbers: [],
    urlList: [],
  }

  const { control, formState, handleSubmit, isCreateMode, register, reset } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div id="OrganizationCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={isCreateMode ? 'Add a new organization' : 'Edit an organization'}
        subtitle={
          isCreateMode ? 'Enter the details for the new organization.' : ''
        }
      />
      {!isCreateMode && (
        <div className="w-full flex justify-end mt-6 px-6">
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label="Delete organization"
            message="Are you sure you want to delete this organization from your site?"
            note="This will remove the organization from your Contact page."
          />
        </div>
      )}
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-x-10 gap-y-8">
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField
              label="Name"
              nameId="name"
              register={register}
              formState={formState}
            />
          </div>
          <div className="col-span-12">
            <Form.TextAreaField
              label="Message"
              nameId="contactMessage"
              helpText="Add a message to appear with this organization on your Contact page."
              register={register}
              formState={formState}
            />
          </div>
          <div className="col-span-12">
            <Form.WysiwygField
              label="Address"
              nameId="address"
              control={control}
              formState={formState}
            />
          </div>
          <div className="col-span-12">
            <Form.TextPairArrayField
              label="Phone numbers"
              nameId="phoneNumbers"
              helpText={
                <div>
                  Add any phone numbers you would like to appear on your Contact
                  page.
                  <br /> Optional: Enter a label for each number e.g. Fax:
                  123-456-7890
                </div>
              }
              firstKey="value"
              firstPlaceholder="Phone number e.g. 123-456-7890"
              secondKey="label"
              secondPlaceholder="Label e.g. Fax, or Office"
              maxItems={4}
              control={control}
              register={register}
              formState={formState}
            />
          </div>
          <div className="col-span-12">
            <Form.TextPairArrayField
              label="Emails"
              nameId="emails"
              helpText={
                <div>
                  Add any emails you would like to appear on your Contact page.
                  <br /> Optional: Enter a label for each email e.g. Language
                  enquiries: language@yourorganization.com
                </div>
              }
              firstKey="value"
              firstPlaceholder="Email e.g. example@email.com"
              secondKey="label"
              secondPlaceholder="Label e.g. Language enquiries"
              maxItems={4}
              control={control}
              register={register}
              formState={formState}
            />
          </div>
          <div className="col-span-12">
            <Form.TextPairArrayField
              label="Links"
              nameId="urlList"
              helpText={
                <div>
                  Add any links to websites you would like to appear on your
                  Contact page.
                  <br /> Optional: Enter a label for each link e.g. Facebook:
                  https://www.facebook.com/firstpeoplesculturalcouncil/
                </div>
              }
              firstKey="value"
              firstPlaceholder="Link e.g. https://www.fpcc.ca"
              secondKey="label"
              secondPlaceholder="Label e.g. Our website"
              maxItems={8}
              control={control}
              register={register}
              formState={formState}
            />
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Add Organization' : 'Save Changes'}
              submitIcon={isCreateMode ? 'Add' : 'Save'}
              cancelIcon="Close"
              cancelLabel="Cancel"
              onCancelClick={backHandler}
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

OrganizationCrudPresentation.propTypes = {
  backHandler: func,
  deleteHandler: func,
  submitHandler: func,
  dataToEdit: object,
}

export default OrganizationCrudPresentation

import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { PUBLIC } from 'common/constants/visibility'

function PageForm({ cancelHandler, dataToEdit, submitHandler, deleteHandler }) {
  const validator = yup.object().shape({
    title: definitions.title().required('A title is required'),
    subtitle: definitions.paragraph({ charCount: 225 }),
    slug: definitions.latinOnly({ message: 'Please enter a URL' }),
  })

  const defaultValues = {
    title: '',
    subtitle: '',
    slug: '',
    bannerImage: '',
    bannerVideo: '',
    visibility: PUBLIC,
    banner: {
      docId: '',
      docType: '',
    },
  }

  const { control, errors, handleSubmit, isCreateMode, register, reset } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div
      id="PageForm"
      className="flex flex-col max-w-5xl p-8 space-y-2 min-h-screen"
    >
      <div>
        <div className="w-full flex justify-center">
          <Form.Header
            title={
              isCreateMode
                ? 'Create a new custom page'
                : 'Edit your custom page'
            }
            subtitle={
              isCreateMode ? 'Enter the details for your new page.' : ''
            }
          />
        </div>
        {!isCreateMode && (
          <div className="flex w-full justify-end">
            <DeleteButton.Presentation
              id={dataToEdit?.id}
              label="Delete Page"
              message="Are you sure you want to delete this page from your site?"
              deleteHandler={deleteHandler}
            />
          </div>
        )}
      </div>
      <form
        onReset={reset}
        className="grow grid grid-cols-1 gap-2 content-between"
      >
        <div className="space-y-5 w-full">
          <section>
            <div className="shadow rounded-md">
              <div className="grid grid-cols-12 gap-8 bg-white p-8 rounded-md">
                <div className="col-span-12 sm:col-span-6">
                  <Form.TextField
                    label="Title"
                    nameId="title"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-12">
                  <Form.TextField
                    label="Subtitle"
                    nameId="subtitle"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <Form.TextField
                    label="URL"
                    nameId="slug"
                    helpText={
                      isCreateMode
                        ? 'Enter a short URL for your page with no special characters or spaces (example: our-people)'
                        : 'The URL cannot be edited. Please create a new page if the URL is no longer appropriate for this page.'
                    }
                    register={register}
                    disabled={!isCreateMode}
                    errors={errors}
                  />
                </div>
                <div className="col-span-12 flex items-center justify-start">
                  <Form.SelectOneMedia
                    label="Add banner background"
                    nameId="banner"
                    control={control}
                    errors={errors}
                    helpText={
                      <div>
                        Choose between adding an image or a silent video.
                        Recommended size: 2048 x 300, or the widest possible
                        video.
                        <div>
                          <a
                            href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/36012038/New+Creating+and+editing+custom+pages"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-blue-600 visited:text-purple-600 underline"
                          >
                            Read more about requirements for page banners.
                          </a>
                        </div>
                      </div>
                    }
                  />
                </div>
                <div className="col-span-12">
                  <Form.Visibility
                    control={control}
                    errors={errors}
                    label="Who can see this page?"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="flex w-full justify-end">
          <div>
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Create page' : 'Save changes'}
              submitIcon={isCreateMode ? 'Add' : 'Save'}
              cancelIcon={isCreateMode ? 'BackArrow' : 'Close'}
              cancelLabel={isCreateMode ? 'Go back' : 'Cancel'}
              onCancelClick={cancelHandler}
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </section>
      </form>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

PageForm.propTypes = {
  cancelHandler: func,
  submitHandler: func,
  deleteHandler: func,
  dataToEdit: object,
}

export default PageForm

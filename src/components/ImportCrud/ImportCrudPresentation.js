import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

// FPCC
import Form from 'components/Form'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'
import { useImportJobAddMedia } from 'common/dataHooks/useImportJobs'

function ImportCrudPresentation({ backHandler, dataToEdit, submitHandler }) {
  const SUPPORTED_IMPORT_EXTENSIONS = ['csv']
  const validator = yup.object().shape({
    title: definitions.title().required('A name is required'),
    csvFile: definitions
      .file({ SUPPORTED_IMPORT_EXTENSIONS })
      .required('A file is required'),
  })

  const defaultValues = {
    title: '',
    csvFile: null,
  }

  const { errors, handleSubmit, isCreateMode, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const mediaForm = useForm()
  const mutation = useImportJobAddMedia()
  const mediaSubmitHandler = (formJson) => mutation.mutate(formJson)

  return (
    <div id="ImportCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title="New import job"
        subtitle="Add the csv and any new media files it references"
      />
      {isCreateMode ? (
        <form id="CreateImportJobForm" onReset={reset}>
          <div className="mt-6 grid grid-cols-12 gap-6 bg-white p-8 rounded-md">
            <div className="col-span-12">
              <Form.TextField
                label="Title"
                nameId="title"
                helpText={`Add a title for this import to help you identify it e.g. "Nature Words", or "Spring 2026 Batch 02"`}
                disabled={!isCreateMode}
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.FileUploadField
                label="CSV file "
                nameId="csvFile"
                helpText="Add your completed batch template csv in UTF-8 format."
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-12 flex justify-end mt-6 px-6">
              <Form.SubmitButtons
                submitLabel="Create import job"
                submitIcon="Add"
                cancelIcon="Close"
                cancelLabel="Cancel"
                onCancelClick={backHandler}
                onSubmitClick={handleSubmit(submitHandler)}
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="mt-6 bg-white p-8 rounded-md">
          {/* Import Job Details */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <Form.FieldLabel nameId="title" text="Title" />
              <div className="text-charcoal-700">{dataToEdit?.title}</div>
            </div>
            <div className="col-span-12">
              <Form.FieldLabel nameId="csvFile" text="CSV File" />
              <div>
                <div className="inline-flex items-center justify-center space-x-2">
                  {getIcon('Document', 'size-5 text-charcoal-400')}
                  <span>{getLastPathSegment(dataToEdit?.data?.path)}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Add Media Form */}
          <form id="AddMediaForm" className="grid grid-cols-12 gap-6 mt-6">
            <div className="hidden">
              <input
                id="type"
                name="type"
                type="hidden"
                value={dataToEdit?.id}
                {...mediaForm.register('id')}
              />
            </div>
            <div className="col-span-12">
              <Form.FieldLabel
                nameId="media"
                text="Add any media referenced in your csv:"
              />
              <input
                type="file"
                {...mediaForm.register('files')}
                multiple
                className="bg-white block w-full border border-charcoal-200 rounded-lg shadow-xs p-3 file:mr-5 file:btn-md file:btn-primary hover:file:bg-blumine-800"
              />
            </div>
            <div className="col-span-12 flex justify-end mt-6 px-6">
              <Form.SubmitButtons
                submitLabel="Upload media"
                submitIcon="Add"
                cancelIcon="Close"
                cancelLabel="Cancel"
                onCancelClick={backHandler}
                onSubmitClick={mediaForm.handleSubmit(mediaSubmitHandler)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

ImportCrudPresentation.propTypes = {
  backHandler: func,
  submitHandler: func,
  dataToEdit: object,
  uppy: object,
}

export default ImportCrudPresentation

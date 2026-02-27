import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'

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

  return (
    <div id="ImportCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title="New import job"
        subtitle="Add the csv and any new media files it references"
      />
      {isCreateMode ? (
        <form onReset={reset}>
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
                submitLabel="Upload csv"
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
        <div>
          <div>
            <div className="mt-6 grid grid-cols-12 gap-6 bg-white p-8 rounded-md">
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
          </div>
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
}

export default ImportCrudPresentation

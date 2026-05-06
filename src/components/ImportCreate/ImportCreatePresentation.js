import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// FPCC
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'

function ImportCreatePresentation({ backHandler, submitHandler }) {
  const SUPPORTED_IMPORT_EXTENSIONS = ['csv']
  const validator = yup.object().shape({
    title: definitions.title().required('A title for your import is required'),
    csvFile: definitions
      .file({ SUPPORTED_IMPORT_EXTENSIONS })
      .required('A csv file is required'),
  })

  const defaultValues = {
    title: '',
    csvFile: null,
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validator),
  })

  return (
    <div id="ImportCreatePresentation" className="max-w-5xl p-8">
      <Form.Header
        title="New import job"
        subtitle="Upload your batch csv and a unique title for your import"
      />
      <form id="CreateImportJobForm" onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6 bg-white p-8 rounded-lg">
          <div className="col-span-12">
            <Form.TextField
              label="Title"
              nameId="title"
              helpText={`Add a title for this import to help you identify it e.g. "Nature Words", or "Spring 2026 Batch 02"`}
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
    </div>
  )
}

// PROPTYPES
const { func } = PropTypes

ImportCreatePresentation.propTypes = {
  backHandler: func,
  submitHandler: func,
}

export default ImportCreatePresentation

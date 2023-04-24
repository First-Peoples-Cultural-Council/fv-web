import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import * as yup from 'yup'

// FPCC
import api from 'services/api'
import Form from 'components/Form'
import useEditForm from 'common/useEditForm'
import { definitions } from 'common/utils/validationHelpers'

function UploadAudio({ site, extensionList, setSelectedMedia }) {
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)

  const validator = yup.object().shape({
    title: definitions.title().required('A title is required'),
    acknowledgement: definitions.paragraph(),
    notes: definitions.paragraph(),
    audioFile: definitions.file({ extensionList: extensionList }).required('A file is required'),
  })

  const defaultValues = {
    title: '',
    acknowledgement: '',
    notes: '',
    audioFile: null,
    speakers: [],
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit: {},
  })

  const { data: speakerData } = useQuery(['speakers', site?.uid], () => api.speaker.getAll({ siteId: site?.uid }), {
    // The query will not execute until the uid exists
    enabled: !!site?.uid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const speakerOptions = speakerData?.entries?.map((entry) => ({ label: entry?.title, value: entry?.uid }))

  const submitHandler = (formData) => {
    const file = formData?.audioFile?.[0]

    if (!file) {
      return
    }
    // Getting media upload Url
    api.media.getS3Url({ quantity: 1 }).then((data) => {
      const s3Url = data?.urls?.[0]
      // Handle error here if no s3Url
      if (!s3Url) return
      setIsUploading(true)
      api.media.upload({ s3Url, file }).then((s3Response) => {
        const mediaUrl = s3Response?.url
        if (!mediaUrl) return
        api.media
          .markComplete({
            filename: file?.name,
            dialectId: site?.uid,
            url: mediaUrl,
            title: formData?.title,
            notes: formData?.notes,
            acknowledgement: formData?.acknowledgement,
            speaker: formData?.speakers,
          })
          .then((markCompleteResponse) => {
            // If upload done, update the form array
            if (markCompleteResponse?.documentId) {
              setIsUploading(false)
              setFileUploaded(true)
              setSelectedMedia((oldArray) => [...oldArray, markCompleteResponse?.documentId])
            }
          })
      })
    })
  }

  return (
    <div id="UploadAudio" className="text-left px-4">
      <Form.Header subtitle="Upload a new Audio file" />
      <form onReset={reset}>
        <div className="mt-2 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Form.TextField label="Title" nameId="title" register={register} />
            {errors?.title && <div className="text-red-500">{errors?.title?.message}</div>}
          </div>

          <div className="col-span-12">
            <Form.TextField label="Acknowledgements" nameId="acknowledgement" register={register} />
            {errors?.acknowledgement && <div className="text-red-500">{errors?.acknowledgement?.message}</div>}
          </div>

          <div className="col-span-12">
            <Form.TextField label="General Notes" nameId="notes" register={register} />
            {errors?.notes && <div className="text-red-500">{errors?.notes?.message}</div>}
          </div>

          <div className="col-span-12">
            <Form.FileUploadField label="Audio File" nameId="audioFile" register={register} />
            {errors?.audioFile && <div className="text-red-500">{errors?.audioFile?.message}</div>}
          </div>

          <div className="col-span-12">
            <Form.AutocompleteMultiple
              label="Speakers"
              nameId="speakers"
              control={control}
              options={speakerOptions}
              placeholder="Find speakers to add.."
            />
          </div>

          <div className="col-span-12 flex justify-end mt-2 px-6">
            {isUploading && <Form.SubmitButtons submitLabel="Uploading .." submitIcon="Upload" onSubmitClick={null} />}
            {!isUploading && !fileUploaded && (
              <Form.SubmitButtons
                submitLabel="Upload File"
                submitIcon="Upload"
                onSubmitClick={handleSubmit(submitHandler)}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes

UploadAudio.propTypes = {
  site: object,
  extensionList: array,
  setSelectedMedia: func,
}

export default UploadAudio

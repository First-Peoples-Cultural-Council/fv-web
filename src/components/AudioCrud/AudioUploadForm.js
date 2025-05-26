import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'

// FPCC
import SubmitButtons from 'components/Form/SubmitButtons'
import FileUploadField from 'components/Form/FileUploadField'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { usePeople } from 'common/dataHooks/usePeople'
import { SUPPORTED_AUDIO_EXTENSIONS, AUDIO_PATH } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'
import { useAudioCreate } from 'common/dataHooks/useAudio'
import AudioBaseForm from 'components/AudioCrud/AudioBaseForm'

function AudioUploadForm({ setSelectedAudio }) {
  const { site } = useSiteStore()
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const errorRef = useRef(null)
  const queryClient = useQueryClient()

  const validator = yup.object().shape({
    title: definitions.title().required('A title is required'),
    acknowledgement: definitions.paragraph(),
    description: definitions.paragraph(),
    audioFile: definitions
      .file({ SUPPORTED_AUDIO_EXTENSIONS })
      .required('A file is required'),
  })

  const defaultValues = {
    title: '',
    acknowledgement: '',
    description: '',
    includeInGames: 'true',
    includeInKids: 'true',
    isShared: false,
    audioFile: null,
    speakers: [],
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit: {},
  })

  const { data: speakerData } = usePeople()

  const speakerOptions = speakerData?.results?.map((entry) => ({
    label: entry?.name,
    value: entry?.id,
  }))

  const { mutate } = useAudioCreate({
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [AUDIO_PATH, site?.sitename, response?.id],
      })
      setIsUploading(false)
      setFileUploaded(true)
      setSelectedAudio((oldArray) => [...oldArray, response?.id])
    },
    onError: (error) => {
      setIsUploading(false)
      setUploadError(
        error?.response?.data?.message ||
          'Audio upload failed. Please try again.',
      )
      setTimeout(() => {
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: 'auto' }) // Jump to the error when it appears
        }
      }, 50)
    },
  })

  const submitHandler = (formData) => {
    if (!formData?.audioFile?.[0]) {
      return
    }
    setIsUploading(true)
    setUploadError(null)
    mutate(formData)
  }

  return fileUploaded ? (
    <div className="h-96 flex items-center justify-center">
      <div>
        <p>File successfully uploaded.</p>
        <p>Click insert above to add it to this dictionary entry.</p>
      </div>
    </div>
  ) : (
    <div id="AudioUploadForm" className="max-w-5xl pb-4 text-left mx-auto">
      <div ref={errorRef}>
        {uploadError && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            <p>{uploadError}</p>
          </div>
        )}
      </div>
      <form onReset={reset}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <FileUploadField
              label="Choose Audio File"
              nameId="audioFile"
              register={register}
              errors={errors}
            />
          </div>
          <AudioBaseForm
            register={register}
            errors={errors}
            control={control}
            speakerOptions={speakerOptions}
          />
          <div className="col-span-12 flex justify-end mt-2 px-6">
            {isUploading && (
              <SubmitButtons
                submitLabel="Uploading .."
                submitIcon="Upload"
                onSubmitClick={null}
              />
            )}
            {!isUploading && !fileUploaded && (
              <SubmitButtons
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
const { func } = PropTypes

AudioUploadForm.propTypes = {
  setSelectedAudio: func,
}

export default AudioUploadForm

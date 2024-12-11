import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'

// FPCC
import Header from 'components/Form/Header'
import SubmitButtons from 'components/Form/SubmitButtons'
import TextField from 'components/Form/TextField'
import Audience from 'components/Form/Audience'
import FileUploadField from 'components/Form/FileUploadField'
import AutocompleteMultiple from 'components/Form/AutocompleteMultiple'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { usePeople } from 'common/dataHooks/usePeople'
import { SUPPORTED_AUDIO_EXTENSIONS, IMAGE_PATH } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'
import { useAudioCreate } from 'common/dataHooks/useMedia'

function UploadAudio({ setSelectedMedia }) {
  const { site } = useSiteStore()
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
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
        queryKey: [IMAGE_PATH, site?.sitename, response?.id],
      })
      setIsUploading(false)
      setFileUploaded(true)
      setSelectedMedia((oldArray) => [...oldArray, response?.id])
    },
  })

  const submitHandler = (formData) => {
    if (!formData?.audioFile?.[0]) {
      return
    }
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
    <div id="UploadAudio" className="h-full text-left px-4">
      <Header subtitle="Upload a new Audio file" />
      <form onReset={reset}>
        <div className="mt-2 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <TextField
              label="Title"
              nameId="title"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <TextField
              label="Description"
              nameId="description"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <TextField
              label="Acknowledgements"
              nameId="acknowledgement"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <AutocompleteMultiple
              label="Speakers"
              nameId="speakers"
              control={control}
              options={speakerOptions}
              placeholder="Find speakers to add.."
            />
          </div>
          <div className="col-span-12">
            <FileUploadField
              label="Audio File"
              nameId="audioFile"
              register={register}
              errors={errors}
            />
          </div>
          <Audience control={control} errors={errors} />
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

UploadAudio.propTypes = {
  setSelectedMedia: func,
}

export default UploadAudio

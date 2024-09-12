import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import api from 'services/api'
import Header from 'components/Form/Header'
import SubmitButtons from 'components/Form/SubmitButtons'
import TextField from 'components/Form/TextField'
import RadioButtons from 'components/Form/RadioButtons'
import FileUploadField from 'components/Form/FileUploadField'
import AutocompleteMultiple from 'components/Form/AutocompleteMultiple'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { usePeople } from 'common/dataHooks/usePeople'
import { SUPPORTED_AUDIO_EXTENSIONS } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'

function UploadAudio({ setSelectedMedia }) {
  const { site } = useSiteStore()
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)

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

  const submitHandler = (formData) => {
    const file = formData?.audioFile?.[0]

    if (!file) {
      return
    }

    // Audience flags
    const excludeFromGames = formData?.includeInGames === 'false'
    const excludeFromKids = formData?.includeInKids === 'false'

    const data = new FormData()
    data.append('title', formData?.title)
    data.append('description', formData?.description)
    data.append('acknowledgement', formData?.acknowledgement)
    data.append('excludeFromGames', excludeFromGames)
    data.append('excludeFromKids', excludeFromKids)
    data.append('isShared', formData?.isShared)
    data.append('original', file)

    formData?.speakers.forEach((speaker) => {
      data.append('speakers', speaker)
    })

    api.media
      .uploadAudio({
        sitename: site?.sitename,
        data,
      })
      .then((res) => {
        setIsUploading(false)
        setFileUploaded(true)
        setSelectedMedia((oldArray) => [...oldArray, res?.id])
      })
  }

  return (
    <div id="UploadAudio" className="h-full text-left p-4">
      <Header subtitle="Upload a new Audio file" />
      <form onReset={reset}>
        <div className="mt-2 grid grid-cols-12">
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
            <RadioButtons
              label="Include on the Kids site?"
              control={control}
              errors={errors}
              nameId="includeInKids"
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
            />
          </div>

          <div className="col-span-12">
            <RadioButtons
              label="Include in games?"
              control={control}
              errors={errors}
              nameId="includeInGames"
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
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

          <div className="col-span-12">
            <AutocompleteMultiple
              label="Speakers"
              nameId="speakers"
              control={control}
              options={speakerOptions}
              placeholder="Find speakers to add.."
            />
          </div>

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

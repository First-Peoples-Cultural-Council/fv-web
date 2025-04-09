import React from 'react'

// FPCC
import LoadOrError from 'components/LoadOrError'
import AudioEditForm from 'components/AudioCrud/AudioEditForm'
import AudioCrudData from 'components/AudioCrud/AudioCrudData'

function AudioCrudContainer() {
  const { queryResponse, speakerOptions, submitHandler, backHandler } =
    AudioCrudData()

  return (
    <LoadOrError queryResponse={queryResponse}>
      <AudioEditForm
        dataToEdit={queryResponse?.data}
        speakerOptions={speakerOptions}
        submitHandler={submitHandler}
        backHandler={backHandler}
      />
    </LoadOrError>
  )
}

export default AudioCrudContainer

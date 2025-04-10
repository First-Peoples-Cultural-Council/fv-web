import React from 'react'

// FPCC
import LoadOrError from 'components/LoadOrError'
import VideoCrudPresentation from 'components/VideoCrud/VideoCrudPresentation'
import VideoCrudData from 'components/VideoCrud/VideoCrudData'

function VideoCrudContainer() {
  const { queryResponse, submitHandler, backHandler } = VideoCrudData()

  return (
    <LoadOrError queryResponse={queryResponse}>
      <VideoCrudPresentation
        dataToEdit={queryResponse?.data}
        submitHandler={submitHandler}
        backHandler={backHandler}
      />
    </LoadOrError>
  )
}

export default VideoCrudContainer

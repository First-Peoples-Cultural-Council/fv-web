import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import MediaEditPresentation from 'components/MediaEdit/MediaEditPresentation'
import MediaEditData from 'components/MediaEdit/MediaEditData'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

function MediaEditContainer({ mediaType }) {
  const { isLoading, dataToEdit, submitHandler, backHandler } = MediaEditData({
    mediaType,
  })

  return (
    <Loading.Container isLoading={isLoading}>
      <MediaEditPresentation
        mediaType={mediaType}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        backHandler={backHandler}
      />
    </Loading.Container>
  )
}

const { oneOf } = PropTypes

MediaEditContainer.propTypes = {
  mediaType: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default MediaEditContainer

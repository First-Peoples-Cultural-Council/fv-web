import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import MediaEditPresentation from 'components/MediaEdit/MediaEditPresentation'
import MediaEditData from 'components/MediaEdit/MediaEditData'
import {
  TYPE_AUDIO,
  TYPE_DOCUMENT,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from 'common/constants'

function MediaEditContainer({ mediaType }) {
  const { mediaQueryResponse, submitHandler, backHandler } = MediaEditData({
    mediaType,
  })

  return (
    <LoadOrError queryResponse={mediaQueryResponse}>
      <MediaEditPresentation
        mediaType={mediaType}
        dataToEdit={mediaQueryResponse?.data}
        submitHandler={submitHandler}
        backHandler={backHandler}
      />
    </LoadOrError>
  )
}

const { oneOf } = PropTypes

MediaEditContainer.propTypes = {
  mediaType: oneOf([TYPE_AUDIO, TYPE_DOCUMENT, TYPE_IMAGE, TYPE_VIDEO]),
}

export default MediaEditContainer

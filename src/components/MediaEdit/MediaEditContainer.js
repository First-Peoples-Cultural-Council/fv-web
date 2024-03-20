import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import MediaEditPresentation from 'components/MediaEdit/MediaEditPresentation'
import MediaEditData from 'components/MediaEdit/MediaEditData'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

function MediaEditContainer({ docType }) {
  const { isLoading, dataToEdit, submitHandler } = MediaEditData({ docType })

  return (
    <Loading.Container isLoading={isLoading}>
      <MediaEditPresentation
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
      />
    </Loading.Container>
  )
}

const { oneOf } = PropTypes

MediaEditContainer.propTypes = {
  docType: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default MediaEditContainer

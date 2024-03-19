import React from 'react'

// FPCC
import Loading from 'components/Loading'
import MediaEditPresentation from 'components/MediaEdit/MediaEditPresentation'

function MediaEditContainer() {
  return (
    <Loading.Container isLoading={false}>
      <MediaEditPresentation />
    </Loading.Container>
  )
}

export default MediaEditContainer

import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

// FPCC
import { useGallery } from 'common/dataHooks/useGalleries'
import GalleryPresentation from 'components/Gallery/GalleryPresentation'
import LoadOrError from 'components/LoadOrError'

function GalleryContainer({ id }) {
  const { id: paramsId } = useParams()
  const queryResponse = useGallery({ id: id || paramsId })

  return (
    <LoadOrError queryResponse={queryResponse}>
      <GalleryPresentation data={queryResponse?.data} />
    </LoadOrError>
  )
}

// PROPTYPES
const { string } = PropTypes
GalleryContainer.propTypes = {
  id: string,
}

export default GalleryContainer

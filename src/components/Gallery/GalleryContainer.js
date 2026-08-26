import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

// FPCC
import { useGallery } from 'common/dataHooks/useGalleries'
import GalleryPresentation from 'components/Gallery/GalleryPresentation'
import GalleryPresentationThumbnail from 'components/Gallery/GalleryPresentationThumbnail'

function GalleryContainer({ id, view }) {
  const { id: paramsId } = useParams()
  const { data } = useGallery({ id: id || paramsId })

  if (view === 'thumbnail') {
    return <GalleryPresentationThumbnail data={data} />
  }
  return <GalleryPresentation data={data} />
}

// PROPTYPES
const { string } = PropTypes
GalleryContainer.propTypes = {
  id: string,
  view: string,
}

export default GalleryContainer

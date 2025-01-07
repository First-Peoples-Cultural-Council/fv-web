import React from 'react'

// FPCC
import GalleriesPresentation from 'components/Galleries/GalleriesPresentation'
import { useGalleries } from 'common/dataHooks/useGalleries'

function GalleriesContainer() {
  const galleriesQueryResponse = useGalleries()
  return (
    <GalleriesPresentation galleriesQueryResponse={galleriesQueryResponse} />
  )
}

export default GalleriesContainer

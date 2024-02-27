import React from 'react'

// FPCC
import GalleriesPresentation from 'components/Galleries/GalleriesPresentation'
import GalleriesData from 'components/Galleries/GalleriesData'

function GalleriesContainer() {
  const { galleries, isLoading, sitename } = GalleriesData()
  return (
    <GalleriesPresentation
      galleries={galleries}
      isLoading={isLoading}
      sitename={sitename}
    />
  )
}

export default GalleriesContainer

import React from 'react'
import PropTypes from 'prop-types'

import GalleryPresentation from 'components/Gallery/GalleryPresentation'
import GalleryPresentationThumbnail from 'components/Gallery/GalleryPresentationThumbnail'
import GalleryPresentationWidget from 'components/Gallery/GalleryPresentationWidget'
import GalleryData from 'components/Gallery/GalleryData'

function GalleryContainer({ id, view }) {
  const { data, sitename } = GalleryData({ id })
  if (view === 'widget') {
    return <GalleryPresentationWidget data={data} sitename={sitename} />
  }
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

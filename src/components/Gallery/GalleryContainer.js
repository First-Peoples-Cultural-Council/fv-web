import React from 'react'
import PropTypes from 'prop-types'

import GalleryPresentation from 'components/Gallery/GalleryPresentation'
import GalleryPresentationWidget from 'components/Gallery/GalleryPresentationWidget'
import GalleryData from 'components/Gallery/GalleryData'

function GalleryContainer({ widgetData }) {
  const { data, sitename, widgetView } = GalleryData({ widgetData })
  return widgetView ? (
    <GalleryPresentationWidget data={data} sitename={sitename} />
  ) : (
    <GalleryPresentation data={data} />
  )
}

// PROPTYPES
const { object } = PropTypes
GalleryContainer.propTypes = {
  widgetData: object,
}

export default GalleryContainer

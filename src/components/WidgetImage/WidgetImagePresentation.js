import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImagePresentation({ widgetData }) {
  const { caption, image } = widgetData.settings

  return (
    <section id="WidgetImagePresentation" className="py-6 md:py-12">
      <figure className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col space-y-4">
        {image && (
          <ImgFromId.Container
            className="max-h-[80vh] overflow-hidden rounded-xl bg-charcoal-100 object-contain"
            id={image}
          />
        )}
        {caption && (
          <figcaption className="flex flex-wrap">{caption}</figcaption>
        )}
      </figure>
    </section>
  )
}

// PROPTYPES
const { string, shape } = PropTypes
WidgetImagePresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      image: string,
      caption: string,
    }),
  }),
}

export default WidgetImagePresentation

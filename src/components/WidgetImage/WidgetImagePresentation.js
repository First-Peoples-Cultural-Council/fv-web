import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImagePresentation({ widgetData }) {
  const { caption, image } = widgetData.settings

  return (
    <section className="py-3 md:py-6" data-testid="WidgetImagePresentation">
      <figure className="flex flex-col mx-auto px-3 md:px-0 space-y-2">
        {image && (
          <ImgFromId.Container
            className="max-h-[80vh] object-contain"
            id={image}
          />
        )}
        {caption && (
          <figcaption className="text-center max-w-4xl mx-auto">
            {caption}
          </figcaption>
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

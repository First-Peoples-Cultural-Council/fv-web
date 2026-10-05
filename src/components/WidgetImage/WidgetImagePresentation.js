import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImagePresentation({ widgetData }) {
  const { caption, image } = widgetData.settings

  return (
    <section id="WidgetImagePresentation" className="p-6 md:p-12">
      <div className="px-6 md:px-12">
        <figure className="max-w-7xl mx-auto flex flex-col space-y-4">
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
      </div>
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

import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImageVideoPresentation({ widgetData }) {
  console.log({ widgetData })
  const { caption, image } = widgetData.settings

  const getImageElement = () =>
    image ? (
      <div className="overflow-hidden inline-flex items-center w-auto">
        <ImgFromId.Container
          className="w-full h-64 sm:h-72 md:h-96 lg:h-3/4-screen object-cover"
          id={image}
        />
      </div>
    ) : null

  const getCaptionElement = () => (
    <div className="flex flex-wrap">{caption}</div>
  )

  return (
    <section className="w-full" data-testid="WidgetImageVideoPresentation">
      <div className="flex flex-col bg-gradient-to-b from-white to-charcoal-50 place-items-center">
        <div>{getImageElement()}</div>
        <div>Caption: {getCaptionElement()}</div>
      </div>
    </section>
  )
}

// PROPTYPES
const { string, shape } = PropTypes
WidgetImageVideoPresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      textWithFormatting: string,
      image: string,
    }),
  }),
}

export default WidgetImageVideoPresentation

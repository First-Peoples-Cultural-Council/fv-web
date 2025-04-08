import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImageVideoPresentation({ widgetData }) {
  console.log({ widgetData })
  const { caption, image } = widgetData.settings

  const getImageElement = () =>
    image ? (
      //   <div className="overflow-hidden inline-flex items-center w-auto">
      <ImgFromId.Container
        // className="h-auto w-auto object-cover mx-auto"
        className="w-full"
        id={image}
      />
    ) : //   </div>
    null

  const getCaptionElement = () =>
    caption ? (
      <div className="flex flex-wrap">
        <span className="font-bold">Caption:</span> {caption}
      </div>
    ) : null

  return (
    <section className="w-full" data-testid="WidgetImageVideoPresentation">
      <div className="rounded overflow-hidden flex flex-col mx-auto max-w-2xl">
        <div className="flex flex-col mx-auto overflow-hidden px-6 md:px-0 pt-6">
          {getImageElement()}
          {getCaptionElement()}
        </div>
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

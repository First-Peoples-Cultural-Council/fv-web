import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImagePresentation({ widgetData }) {
  const { caption, image } = widgetData.settings

  const getImageElement = () =>
    image ? <ImgFromId.Container className="w-full" id={image} /> : null

  const getCaptionElement = () =>
    caption ? (
      <div className="flex flex-wrap">
        <span className="font-bold">Caption:</span> {caption}
      </div>
    ) : null

  return (
    <section className="w-full" data-testid="WidgetImagePresentation">
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
WidgetImagePresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      image: string,
    }),
  }),
}

export default WidgetImagePresentation

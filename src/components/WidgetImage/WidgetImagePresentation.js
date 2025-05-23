import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImgFromId from 'components/ImgFromId'

function WidgetImagePresentation({ widgetData }) {
  const { caption, image } = widgetData.settings

  return (
    <section className="w-full pt-8" data-testid="WidgetImagePresentation">
      <div className="rounded overflow-hidden flex flex-col mx-auto max-w-2xl">
        <div className="flex flex-col mx-auto overflow-hidden px-6 md:px-0 pt-6">
          {image && <ImgFromId.Container className="w-full py-4" id={image} />}
          {caption && (
            <div className="flex flex-wrap">
              <p>{caption}</p>
            </div>
          )}
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
      caption: string,
    }),
  }),
}

export default WidgetImagePresentation

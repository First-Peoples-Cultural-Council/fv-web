import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function WidgetIframePresentation({ widgetData }) {
  const { title, text, src } = widgetData?.settings
  const iframeOnly = !title && !text
  const isMapSrc = src.startsWith('https://maps.fpcc.ca/')

  if (iframeOnly && isMapSrc) {
    return (
      <div className="bg-scarlet-900 lg:bg-transparent p-6 lg:py-6 lg:px-0">
        <div className="lg:grid lg:grid-cols-12">
          <div className="z-10 lg:col-start-4 lg:row-start-1 lg:col-span-6 lg:bg-transparent">
            <div className="mx-auto max-w-3xl lg:max-w-none">
              <iframe
                title="Map"
                allow="geolocation"
                allowfullscreen="true"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                className="aspect-3/2 w-full object-cover object-center rounded-xl shadow-2xl border-2 border-scarlet-900 bg-white"
                src={src}
              />
            </div>
          </div>

          <div className="lg:my-20 relative bg-scarlet-900 lg:col-start-1 lg:row-start-1 lg:col-span-12 lg:flex lg:items-center lg:py-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto bg-scarlet-900 lg:bg-transparent p-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12">
        <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-8 lg:py-10 lg:bg-transparent">
          <div className="mx-auto max-w-3xl lg:max-w-none">
            {isMapSrc && (
              <iframe
                title={src}
                className="aspect-3/2 w-full object-cover object-center rounded-xl shadow-2xl border-2 border-scarlet-900 bg-white"
                src={src}
              />
            )}
          </div>
        </div>
        <div className="bg-scarlet-900 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-xl lg:grid lg:grid-cols-10 lg:items-center md:py-4">
          <div className="mx-auto pt-6 space-y-2 sm:space-y-6 max-w-3xl lg:max-w-none lg:p-10 lg:col-start-7 lg:col-span-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              {title}
            </h2>
            <div className="text-lg text-white">{text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { string, shape } = PropTypes
WidgetIframePresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      title: string,
      text: string,
      src: string.isRequired,
    }),
  }),
}

export default WidgetIframePresentation

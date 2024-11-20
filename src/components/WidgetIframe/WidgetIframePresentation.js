import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function WidgetIframePresentation({ widgetData }) {
  const { title, text, src } = widgetData?.settings
  const iframeOnly = !title && !text
  const isMapSrc = src.startsWith('https://maps.fpcc.ca/')

  if (iframeOnly && isMapSrc) {
    return (
      <div className="relative py-3 lg:py-6 lg:bg-charcoal-50">
        <div
          className="hidden absolute top-0 inset-x-0 h-1/2 bg-white lg:block"
          aria-hidden="true"
        />
        <div className="bg-scarlet-900 lg:bg-transparent">
          <div className="lg:grid lg:grid-cols-12">
            <div className="relative z-10 lg:col-start-4 lg:row-start-1 lg:col-span-6 lg:bg-transparent">
              <div
                className="absolute inset-x-0 h-1/2 bg-white lg:hidden"
                aria-hidden="true"
              />
              <div className="max-w-md mx-auto p-2 sm:p-6 sm:max-w-3xl lg:max-w-none lg:p-0">
                <div className="aspect-w-2 aspect-h-2 lg:aspect-w-3">
                  <iframe
                    title="Map"
                    allow="geolocation"
                    allowfullscreen="true"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                    className="object-cover object-center rounded-xl shadow-2xl border-2 border-scarlet-900 bg-white"
                    src={src}
                  />
                </div>
              </div>
            </div>

            <div className="lg:my-20 relative bg-scarlet-900 lg:col-start-1 lg:row-start-1 lg:col-span-12 lg:flex lg:items-center lg:py-4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative py-3 lg:py-6">
      <div
        className="hidden absolute top-0 inset-x-0 h-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto bg-scarlet-900 lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-8 lg:py-10 lg:bg-transparent">
            <div
              className="absolute inset-x-0 h-1/2 bg-white lg:hidden"
              aria-hidden="true"
            />
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-2 aspect-h-2 xl:aspect-w-3">
                {isMapSrc && (
                  <iframe
                    title={src}
                    className="object-cover object-center rounded-xl shadow-2xl border-2 border-scarlet-900 bg-white"
                    src={src}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="relative bg-scarlet-900 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-xl lg:grid lg:grid-cols-10 lg:items-center md:py-4">
            <div className="relative max-w-md mx-auto p-4 sm:p-6 space-y-2 sm:space-y-6 sm:max-w-3xl lg:max-w-none lg:p-10 lg:col-start-7 lg:col-span-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                {title}
              </h2>
              <div className="text-lg text-white">{text}</div>
            </div>
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

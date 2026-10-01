import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function WidgetIframePresentation({ widgetData }) {
  const settings = widgetData?.settings
  const iframeOnly = !settings?.title && !settings?.text
  const isMapSrc = settings?.src.startsWith('https://maps.fpcc.ca/')

  //   Add params for pared back embedded map
  const url = URL.parse(settings?.src)
  if (url) {
    url.searchParams.set('embed', 1)
    url.searchParams.set('sc', 1)
    url.searchParams.set('ap', 1)
    url.searchParams.set('shp', 1)
  }

  if (iframeOnly && isMapSrc) {
    return (
      <section
        id="WidgetIframePresentation"
        className="mx-auto max-w-7xl w-full px-2 md:px-12"
      >
        <div className="rounded-lg p-6 md:p-12">
          <div className="relative w-full h-auto">
            <iframe
              title="Map"
              allow="geolocation"
              className="aspect-video w-full object-cover object-center rounded-xl p-1 border-2 border-blumine-800 bg-white"
              src={url?.href}
            />

            {/* The Link Overlay */}
            <a
              href={settings?.src}
              target="_blank"
              rel="noreferrer noopener"
              className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-colors duration-300 flex items-center justify-center space-x-2 text-transparent hover:text-white text-lg z-10"
              aria-label="Clickable overlay link"
            >
              <span>Go to {url?.hostname}</span>
              {getIcon('GoTo', 'fill-current size-6')}
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="WidgetIframePresentation" className="w-full px-2 md:px-12">
      <div className="rounded-lg p-6 md:p-12">
        <div className="space-y-6 lg:grid lg:grid-cols-6 gap-8">
          <div className="flex lg:col-span-4 h-full lg:items-center">
            {isMapSrc && (
              <div className="relative w-full h-auto">
                <iframe
                  title="Map"
                  allow="geolocation"
                  className="aspect-3/2 w-full object-cover object-center rounded-xl border-2 p-1 border-blumine-800 bg-white"
                  src={url?.href}
                />

                {/* The Link Overlay */}
                <a
                  href={settings?.src}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-colors duration-300 flex items-center justify-center space-x-2 text-transparent hover:text-white text-lg z-10"
                  aria-label="Clickable overlay link"
                >
                  <span>Go to {url?.hostname}</span>
                  {getIcon('GoTo', 'fill-current size-6')}
                </a>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 lg:rounded-xl lg:grid lg:items-center">
            <div className="mx-auto space-y-2 md:space-y-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blumine-800">
                {settings?.title}
              </h2>
              <div className="text-base xl:text-lg text-blumine-800">
                {settings?.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function WidgetIframePresentation({ widgetData }) {
  const settings = widgetData?.settings
  const iframeOnly = !settings?.title && !settings?.text
  const isMapSrc = settings?.src.startsWith('https://maps.fpcc.ca/')

  if (iframeOnly && isMapSrc) {
    return (
      <section
        id="WidgetIframePresentation"
        className="mx-auto max-w-7xl w-full px-2 md:px-12"
      >
        <div className="rounded-lg p-6 md:p-12">
          <iframe
            title="Map"
            allow="fullscreen; geolocation"
            className="aspect-video w-full object-cover object-center rounded-xl p-1 border-2 border-blumine-800 bg-white"
            src={settings?.src}
            sandbox
          />
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
              <iframe
                title={settings?.src}
                className="aspect-3/2 w-full object-cover object-center rounded-xl border-2 p-1 border-blumine-800 bg-white"
                src={settings?.src}
                sandbox
              />
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

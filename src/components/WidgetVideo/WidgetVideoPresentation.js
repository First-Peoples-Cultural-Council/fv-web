import React from 'react'
import PropTypes from 'prop-types'

function WidgetVideoPresentation({ widgetData }) {
  const { caption, video } = widgetData.settings

  // const getVideoElement = () =>
  //   video && (
  //     <video
  //       className="hidden md:flex absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
  //       autoPlay
  //       muted
  //       loop
  //       src={video}
  //     />
  //   )

  // const getCaptionElement = () =>
  //   caption && <div className="flex flex-wrap">{caption}</div>

  return (
    <section className="w-full" data-testid="WidgetVideoPresentation">
      <div className="rounded overflow-hidden flex flex-col mx-auto max-w-2xl">
        <div className="flex flex-col mx-auto overflow-hidden px-6 md:px-0 pt-6">
          {video && (
            <video
              className="hidden md:flex absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
              autoPlay
              muted
              loop
              src={video}
            />
          )}
          {caption && <div className="flex flex-wrap">{caption}</div>}
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { string, shape } = PropTypes
WidgetVideoPresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      video: string,
    }),
  }),
}

export default WidgetVideoPresentation

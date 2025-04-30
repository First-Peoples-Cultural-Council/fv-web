import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import { useVideo } from 'common/dataHooks/useVideos'
import { TYPE_VIDEO, ORIGINAL } from 'common/constants'

function WidgetVideoPresentation({ widgetData }) {
  const { caption, video } = widgetData.settings

  const [src, setSrc] = useState('')

  const videoQueryResponse = useVideo({ id: video })
  const videoObject = videoQueryResponse?.data

  useEffect(() => {
    if (videoObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: videoObject,
        type: TYPE_VIDEO,
        size: ORIGINAL,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, videoObject])

  return (
    <section className="w-full pt-8" data-testid="WidgetVideoPresentation">
      <div className="rounded overflow-hidden flex flex-col mx-auto max-w-2xl">
        <div className="flex flex-col mx-auto overflow-hidden px-6 md:px-0 pt-6">
          {src && (
            <video
              className="flex w-auto h-auto"
              autoPlay
              muted
              loop
              src={src}
            />
          )}
          {caption && <div className="flex flex-wrap pt-4">{caption}</div>}
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

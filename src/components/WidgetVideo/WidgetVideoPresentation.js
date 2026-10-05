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
    <section id="WidgetVideoPresentation" className="p-6 md:p-12">
      <div className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col space-y-4">
          {src && (
            <video
              className="flex aspect-video overflow-hidden rounded-xl"
              controls
              src={src}
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

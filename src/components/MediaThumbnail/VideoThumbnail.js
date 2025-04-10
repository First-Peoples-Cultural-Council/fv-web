import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useVideo } from 'common/dataHooks/useVideos'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { TYPE_VIDEO, ORIGINAL } from 'common/constants'

function VideoThumbnail({
  id,
  containerStyles = 'block relative w-48 aspect-w-10 aspect-h-7 rounded-lg bg-charcoal-50 overflow-hidden',
  videoStyles = 'object-cover pointer-events-none',
  videoObject,
  ...other
}) {
  const [src, setSrc] = useState('')

  const videoQueryResponse = useVideo({ id })
  const fetchedVideoObject = videoQueryResponse?.data

  useEffect(() => {
    if (videoObject || fetchedVideoObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: videoObject || fetchedVideoObject,
        size: ORIGINAL,
        type: TYPE_VIDEO,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, fetchedVideoObject, videoObject])

  return (
    <div className={containerStyles}>
      <video className={videoStyles} src={src} {...other} disableRemotePlayback>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// PROPTYPES
const { object, string } = PropTypes
VideoThumbnail.propTypes = {
  id: string,
  containerStyles: string,
  videoStyles: string,
  videoObject: object,
}

export default VideoThumbnail

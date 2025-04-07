import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useMediaObject } from 'common/dataHooks/useMedia'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { TYPE_VIDEO, VIDEO, ORIGINAL } from 'common/constants'

function VideoThumbnail({
  id,
  containerStyles = 'block relative w-48 aspect-w-10 aspect-h-7 rounded-lg bg-charcoal-50 overflow-hidden',
  videoStyles = 'object-cover pointer-events-none',
  videoObject,
  ...other
}) {
  const { sitename } = useParams()
  const [src, setSrc] = useState('')

  const mediaObject = useMediaObject({ sitename, id, mediaType: TYPE_VIDEO })
  useEffect(() => {
    if (videoObject || mediaObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: videoObject || mediaObject,
        size: ORIGINAL,
        type: VIDEO,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, mediaObject, videoObject])

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

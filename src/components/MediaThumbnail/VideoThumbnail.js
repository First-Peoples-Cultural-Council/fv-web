import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useVideoObject } from 'common/dataHooks/useMedia'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { VIDEO, ORIGINAL } from 'common/constants'

function VideoThumbnail(props) {
  const { id, size, alt, containerStyles, videoStyles, ...other } = props

  const { sitename } = useParams()
  const [src, setSrc] = useState('')

  const mediaObject = useVideoObject({ sitename, id })
  useEffect(() => {
    if (mediaObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject,
        size,
        type: VIDEO,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, mediaObject, size])

  return (
    <div className={containerStyles}>
      <video className={videoStyles} src={src} {...other} disableRemotePlayback>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// PROPTYPES
const { string } = PropTypes
VideoThumbnail.propTypes = {
  id: string,
  size: string,
  alt: string,
  containerStyles: string,
  videoStyles: string,
}

VideoThumbnail.defaultProps = {
  size: ORIGINAL,
  containerStyles:
    'block relative w-48 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
  videoStyles: 'object-cover pointer-events-none',
}

export default VideoThumbnail

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useMediaObject } from 'common/dataHooks/useMedia'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { TYPE_IMAGE, IMAGE, SMALL } from 'common/constants'

function ImageThumbnail({
  id,
  containerStyles = 'relative w-48 block aspect-w-10 aspect-h-7 rounded-lg bg-charcoal-50 overflow-hidden',
  imageStyles = 'w-full h-full object-contain',
  imageObject,
  ...other
}) {
  const { sitename } = useParams()
  const [src, setSrc] = useState()

  const mediaQueryResponse = useMediaObject({
    sitename,
    id,
    mediaType: TYPE_IMAGE,
  })

  const fetchedImageObject = mediaQueryResponse?.data

  useEffect(() => {
    if (imageObject || fetchedImageObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: imageObject || fetchedImageObject,
        size: SMALL,
        type: IMAGE,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, fetchedImageObject, imageObject])

  return (
    <div id="MediaThumbnailImage" className={containerStyles}>
      <img
        src={src}
        alt={imageObject?.title || fetchedImageObject?.title}
        className={imageStyles}
        {...other}
      />
    </div>
  )
}

// PROPTYPES
const { object, string } = PropTypes
ImageThumbnail.propTypes = {
  id: string,
  containerStyles: string,
  imageStyles: string,
  imageObject: object,
}

export default ImageThumbnail

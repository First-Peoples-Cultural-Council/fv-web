import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useImage } from 'common/dataHooks/useImages'
import getIcon from 'common/utils/getIcon'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { TYPE_IMAGE, SMALL } from 'common/constants'

function ImageThumbnail({
  id,
  containerStyles = 'relative w-48 h-32 block rounded-lg bg-charcoal-50 overflow-hidden',
  imageStyles = 'w-full aspect-3/2 object-cover',
  imageObject,
  ...other
}) {
  const [src, setSrc] = useState()

  const imageQueryResponse = useImage({ id })
  const fetchedImageObject = imageQueryResponse?.data

  useEffect(() => {
    if (imageObject || fetchedImageObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: imageObject || fetchedImageObject,
        size: SMALL,
        type: TYPE_IMAGE,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, fetchedImageObject, imageObject])

  const isTiffFile = src?.toLowerCase().match(/\.tiff?$/)

  return (
    <div id="MediaThumbnailImage" className={containerStyles}>
      {isTiffFile ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 space-y-1">
          {getIcon('Images', 'w-8 h-8 text-charcoal-600 fill-current')}
          <span className="text-xs text-charcoal-600 font-medium">
            Thumbnail will appear on save.
          </span>
          {(imageObject?.title || fetchedImageObject?.title) && (
            <span className="text-xs text-charcoal-600 line-clamp-2">
              {imageObject?.title || fetchedImageObject?.title}
            </span>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={imageObject?.title || fetchedImageObject?.title}
          className={imageStyles}
          loading="lazy"
          {...other}
        />
      )}
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

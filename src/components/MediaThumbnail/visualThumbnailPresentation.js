import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useImageObject } from 'common/dataHooks/useMedia'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, MEDIUM } from 'common/constants'

function VisualThumbnailPresentation(props) {
  const { id, type, size, alt, containerStyles, imageStyles, ...other } = props

  const { sitename } = useParams()
  const [src, setSrc] = useState('')

  const mediaObject = useImageObject({ sitename, id })

  useEffect(() => {
    if (mediaObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject,
        type: IMAGE,
        size: MEDIUM,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, mediaObject])

  return (
    <div className={containerStyles}>
      <img
        src={src}
        alt={alt || mediaObject?.title}
        className={imageStyles}
        {...other}
      />
    </div>
  )
}

// PROPTYPES
const { string, oneOf } = PropTypes
VisualThumbnailPresentation.propTypes = {
  id: string,
  size: string,
  alt: string,
  containerStyles: string,
  imageStyles: string,
  type: oneOf([IMAGE]),
}

// Todo: Confirm default props for videos
VisualThumbnailPresentation.defaultProps = {
  size: MEDIUM,
  containerStyles:
    'relative w-48 block aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
  imageStyles: 'w-full h-full object-contain',
}

export default VisualThumbnailPresentation

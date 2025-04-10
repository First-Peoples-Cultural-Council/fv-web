import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useImage } from 'common/dataHooks/useImages'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { TYPE_IMAGE, MEDIUM } from 'common/constants'

function ImgFromIdContainer({
  id,
  alt,
  className = 'w-full h-full object-contain',
}) {
  const [src, setSrc] = useState('')

  const imageQueryResponse = useImage({ id })
  const imageObject = imageQueryResponse?.data

  useEffect(() => {
    if (imageObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: imageObject,
        type: TYPE_IMAGE,
        size: MEDIUM,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, imageObject])

  return <img src={src} alt={alt || imageObject?.title} className={className} />
}

// PROPTYPES
const { string } = PropTypes
ImgFromIdContainer.propTypes = {
  id: string,
  alt: string,
  className: string,
}

export default ImgFromIdContainer

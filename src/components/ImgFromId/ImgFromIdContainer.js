import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useImageObject } from 'common/dataHooks/useMedia'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, MEDIUM } from 'common/constants'

function ImgFromIdContainer(props) {
  const { mockData, id, size, alt, className, ...other } = props
  const [src, setSrc] = useState('')

  const imageObject = useImageObject({ id })

  useEffect(() => {
    if (imageObject?.original) {
      const srcToUse = getMediaPath({
        mediaObject: imageObject,
        type: IMAGE,
        size: MEDIUM,
      })
      if (srcToUse !== src) {
        setSrc(srcToUse)
      }
    }
  }, [src, setSrc, imageObject])

  return (
    <img
      src={mockData ? id : src}
      alt={alt || imageObject?.title}
      className={className}
      {...other}
    />
  )
}

// PROPTYPES
const { string, bool } = PropTypes
ImgFromIdContainer.propTypes = {
  id: string,
  size: string,
  alt: string,
  className: string,
  mockData: bool,
}

ImgFromIdContainer.defaultProps = {
  size: MEDIUM,
  className: 'w-full h-full object-contain',
}

export default ImgFromIdContainer

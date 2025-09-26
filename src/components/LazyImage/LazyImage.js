import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import simpleSvgPlaceholder from 'common/utils/simpleSvgPlaceholder'
import { IMAGE, MEDIUM, ORIGINAL, SMALL, THUMBNAIL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function LazyImage({
  alt = '',
  imageObject,
  bgColor,
  height,
  width,
  imgStyling = 'w-full h-auto',
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true)
    }
  }, [])

  const getSize = () => {
    if (width <= 100) {
      return THUMBNAIL
    }
    if (width <= 560) {
      return SMALL
    }
    if (width <= 1000) {
      return MEDIUM
    }
    return ORIGINAL
  }

  const placeholder =
    height > 0 || width > 0
      ? simpleSvgPlaceholder({ width, height, bgColor })
      : simpleSvgPlaceholder()

  const aspectRatio = width / height

  const src = getMediaPath({
    mediaObject: imageObject,
    type: IMAGE,
    size: getSize(),
  })

  return (
    <div className={`relative overflow-hidden ${imgStyling}`}>
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />
      <img src={placeholder} alt="Placeholder" aria-hidden="true" />
      <img
        loading="lazy"
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={`absolute w-full h-full top-0 bottom-0 left-0 right-0 object-cover object-center ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

// PROPTYPES
const { number, object, string } = PropTypes
LazyImage.propTypes = {
  alt: string,
  imageObject: object,
  imgStyling: string,
  height: number,
  width: number,
  bgColor: string,
}

export default LazyImage

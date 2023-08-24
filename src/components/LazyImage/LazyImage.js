import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import simpleSvgPlaceholder from 'common/utils/simpleSvgPlaceholder'
import { IMAGE, MEDIUM, ORIGINAL, SMALL, THUMBNAIL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function LazyImage({ alt, imageObject, bgColor, height, width, imgStyling }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true)
    }
  }, [])

  let src = ''

  switch (width) {
    case width <= 100:
      src = getMediaPath({
        mediaObject: imageObject,
        type: IMAGE,
        size: THUMBNAIL,
      })
      break
    case width > 100 && width <= 560:
      src = getMediaPath({
        mediaObject: imageObject,
        type: IMAGE,
        size: SMALL,
      })
      break
    case width > 1000:
      src = getMediaPath({
        mediaObject: imageObject,
        type: IMAGE,
        size: ORIGINAL,
      })
      break
    case width > 560 && width <= 1000:
    default:
      src = getMediaPath({
        mediaObject: imageObject,
        type: IMAGE,
        size: MEDIUM,
      })
      break
  }

  const placeholder =
    height > 0 || width > 0
      ? simpleSvgPlaceholder({ width, height, bgColor })
      : simpleSvgPlaceholder()

  const aspectRatio = width / height

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
          loaded ? 'opacity-1' : 'opacity-0'
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

LazyImage.defaultProps = {
  alt: '',
  imgStyling: 'w-full h-auto',
}

export default LazyImage

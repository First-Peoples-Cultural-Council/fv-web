import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import simpleSvgPlaceholder from 'common/simpleSvgPlaceholder'

function LazyImage({ alt, id, mimeType, bgColor, height, width, imgStyling, onClick, forceLoad, label }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [src, setSrc] = useState(src)
  const ref = useRef()
  const io = useRef()

  const labelClass =
    'absolute border-2 z-10 bg-white w-4 h-4 text-sm flex items-center justify-center bottom-3 right-2 p-1 rounded-full'

  function isGif() {
    return mimeType && mimeType === 'image/gif'
  }

  if (!src && id) {
    if (isGif()) {
      if (width && width <= 560) {
        // Render static image for for GIF
        setSrc(`/nuxeo/nxpicsfile/default/${id}/Small:content/`)
      } else {
        // Render full GIF (Note: this can be very large)
        setSrc(`/nuxeo/nxfile/default/${id}/file:content/`)
      }
    } else {
      // Handle JPG/PNG - determine size based on anticipated width/height if available, otherwise default to Medium.
      // Sizes map to picture conversions in org.nuxeo.ecm.platform.picture.ImagingComponent.default.config--pictureConversions
      let viewName = 'Medium'

      if (width && width <= 100) {
        viewName = 'Thumbnail'
      } else if (width && width > 100 && width <= 560) {
        viewName = 'Small'
      } else if (width && width > 560 && width <= 1000) {
        viewName = 'Medium'
      } else if (width && width > 1000 && width <= 1920) {
        viewName = 'FullHD'
      } else if (width && width > 1920) {
        viewName = 'OriginalJpeg'
      }
      setSrc(`/nuxeo/nxpicsfile/default/${id}/${viewName}:content/`)
    }
  }

  useEffect(() => {
    if (ref.current && !forceLoad) {
      io.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.5) {
              ref.current.src = src
              io.current.unobserve(ref.current)
            }
          })
        },
        { threshold: [0, 0.5, 1] }
      )
      io.current.observe(ref.current)
    }
    return () => {
      if (ref?.current) {
        io.current.unobserve(ref.current)
      }
    }
  }, [ref])

  if (forceLoad) {
    return (
      <React.Fragment>
        <img src={src} className={imgStyling} alt={alt} onClick={onClick} />
        {label && (
          <button onClick={onClick} className={labelClass}>
            {label}
          </button>
        )}
      </React.Fragment>
    )
  }

  const placeholder =
    height > 0 || width > 0
      ? simpleSvgPlaceholder({ width: width, height: height, bgColor: bgColor })
      : simpleSvgPlaceholder()

  return (
    <React.Fragment>
      <img
        ref={ref}
        src={placeholder}
        className={`${imgStyling} ${imgLoaded ? 'opacity-1' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
        onClick={onClick}
        alt={alt}
      />
      {label && (
        <button onClick={onClick} className={labelClass}>
          {label}
        </button>
      )}
    </React.Fragment>
  )
}

// PROPTYPES
const { bool, func, number, string } = PropTypes
LazyImage.propTypes = {
  alt: string,
  label: string,
  id: string,
  mimeType: string,
  imgStyling: string,
  onClick: func,
  height: number,
  width: number,
  bgColor: string,
  forceLoad: bool,
}

LazyImage.defaultProps = {
  alt: '',
  imgStyling: 'w-full h-auto',
  onClick: null,
  forceLoad: false,
}

export default LazyImage

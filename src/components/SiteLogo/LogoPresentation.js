import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function LogoPresentation({ imgSrc, altText, additionalStyling = '' }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <div
      data-testid="SiteLogoPresentation"
      className={`relative overflow-hidden rounded-full bg-charcoal-50 ${additionalStyling}`}
    >
      <div style={{ paddingBottom: '100%' }} />
      <img
        loading="lazy"
        src={imgSrc}
        alt={altText}
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
const { string } = PropTypes
LogoPresentation.propTypes = {
  imgSrc: string,
  altText: string,
  additionalStyling: string,
}

export default LogoPresentation

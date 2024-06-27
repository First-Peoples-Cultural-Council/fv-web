import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { IMAGE, MEDIUM, ORIGINAL, SMALL, THUMBNAIL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import placeholder from 'images/cover-thumbnail.png'

function SiteLogoPresentation({ logo, size = SMALL, additionalStyling = '' }) {
  const { site } = useSiteStore()
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  const logoToUse = logo?.id ? logo : site?.logo
  const altText = `${site?.title} Logo`

  const src = logoToUse?.id
    ? getMediaPath({
        mediaObject: logoToUse,
        type: IMAGE,
        size,
      })
    : placeholder

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <div
      className={`relative overflow-hidden aspect-w-1 aspect-h-1 rounded-full bg-gray-50 ${additionalStyling}`}
    >
      <div style={{ paddingBottom: '100%' }} />
      <img
        loading="lazy"
        src={src}
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
const { object, oneOf, string } = PropTypes
SiteLogoPresentation.propTypes = {
  additionalStyling: string,
  logo: object,
  size: oneOf([MEDIUM, ORIGINAL, SMALL, THUMBNAIL]),
}

export default SiteLogoPresentation

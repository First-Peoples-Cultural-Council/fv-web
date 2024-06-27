import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { IMAGE, MEDIUM, ORIGINAL, SMALL, THUMBNAIL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function SiteLogoPresentation({
  additionalStyling,
  logo,
  size = SMALL,
  heightClasses = 'h-24 sm:h-32 md:h-44 lg:h-60',
  widthClasses = 'w-24 sm:w-32  md:w-44 lg:w-60',
}) {
  const { site } = useSiteStore()
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  const logoToUse = logo?.id ? logo : site?.logo
  const altText = `${site?.title} Logo`

  const src = getMediaPath({
    mediaObject: logoToUse,
    type: IMAGE,
    size,
  })

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-gray-300 ${heightClasses} ${widthClasses} ${additionalStyling}`}
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
  heightClasses: string,
  widthClasses: string,
  size: oneOf([MEDIUM, ORIGINAL, SMALL, THUMBNAIL]),
}

export default SiteLogoPresentation

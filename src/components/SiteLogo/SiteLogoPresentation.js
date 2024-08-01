import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { IMAGE, MEDIUM, ORIGINAL, SMALL, THUMBNAIL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import placeholder from 'images/cover-thumbnail.png'

function SiteLogoPresentation({ logo, size = SMALL, additionalStyling = '' }) {
  const { site } = useSiteStore()
  const { sitename } = useParams()
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  const altText = `${site?.title} Logo`

  const getLogoSrc = () => {
    if (logo?.id) {
      return getMediaPath({
        mediaObject: logo,
        type: IMAGE,
        size,
      })
    }
    // A check for sitename from url prevents siteContext logo from being rendered on non site specific pages
    // A second check for "sitename === site?.sitename" prevents previous site logo from loading before the siteContext is updated when switching between sites
    if (site?.logo && sitename && sitename === site?.sitename) {
      return getMediaPath({
        mediaObject: site?.logo,
        type: IMAGE,
        size,
      })
    }
    return placeholder
  }

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <div
      data-testid="SiteLogoPresentation"
      className={`relative overflow-hidden w-full aspect-w-1 aspect-h-1 rounded-full bg-gray-50 ${additionalStyling}`}
    >
      <div style={{ paddingBottom: '100%' }} />
      <img
        loading="lazy"
        src={getLogoSrc()}
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

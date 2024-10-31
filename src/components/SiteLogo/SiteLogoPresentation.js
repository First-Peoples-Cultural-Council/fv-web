import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import LogoPresentation from 'components/SiteLogo/LogoPresentation'
import { useSiteStore } from 'context/SiteContext'
import { IMAGE, MEDIUM, ORIGINAL, SMALL, THUMBNAIL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import placeholder from 'images/cover-thumbnail.png'

function SiteLogoPresentation({ logo, size = SMALL, additionalStyling = '' }) {
  const { site } = useSiteStore()
  const { sitename } = useParams()

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

  return (
    <LogoPresentation
      imgSrc={getLogoSrc()}
      altText={altText}
      additionalStyling={additionalStyling}
    />
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

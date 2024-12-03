import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import i18next from 'i18next'

// FPCC
import { useImmersionMap } from 'common/dataHooks/useImmersionLabels'
import { useSite } from 'common/dataHooks/useSites'
import { useSiteDispatch, useSiteStore } from 'context/SiteContext'
import { IMMERSION } from 'common/constants'
import { isUUID } from 'common/utils/stringHelpers'

function SiteData() {
  const siteDispatch = useSiteDispatch()
  const { sitename } = useParams()

  // --------------------------------
  // Get Language Site data
  // --------------------------------
  const siteQueryReturn = useSite() // site data request, to put in the site store
  const { site } = useSiteStore() // site store, to validate when it is ready for use

  useEffect(() => {
    if (
      !siteQueryReturn?.isPending &&
      !siteQueryReturn?.isError &&
      siteQueryReturn?.data?.sitename !== site?.sitename
    ) {
      siteDispatch({ type: 'SET', data: siteQueryReturn?.data })
    }
  }, [siteQueryReturn, siteDispatch, sitename, site?.sitename])

  // --------------------------------
  // Get immersion data
  // --------------------------------
  const immersionQueryReturn = useImmersionMap()

  useEffect(() => {
    if (!immersionQueryReturn?.isPending && !immersionQueryReturn?.isError) {
      // addResourceBundle will not replace the labels if the object is empty (i.e. a site has no labels).
      // To prevent labels from one site carrying over to a site with no labels we must clear the resource
      if (JSON.stringify(immersionQueryReturn?.data) === '{}') {
        i18next.removeResourceBundle('language', 'translation')
      } else {
        i18next.addResourceBundle(
          'language',
          'translation',
          immersionQueryReturn?.data,
        )
      }
    }
  }, [immersionQueryReturn])

  useEffect(() => {
    // If on a site that doesn't have the immersion feature
    // then make sure it is turned off (i.e. switch back to English)
    if (isUUID(site?.id) && !site?.checkForEnabledFeature(IMMERSION)) {
      i18next.changeLanguage('en')
    }
  }, [site])

  return {
    queryReturn: siteQueryReturn,
  }
}

export default SiteData

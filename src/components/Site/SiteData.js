import { useEffect } from 'react'
import { useParams } from 'react-router'
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
  const siteQueryResponse = useSite() // site data request, to put in the site store
  const { site } = useSiteStore() // site store, to validate when it is ready for use

  useEffect(() => {
    if (
      !siteQueryResponse?.isPending &&
      !siteQueryResponse?.isError &&
      siteQueryResponse?.data?.sitename !== site?.sitename
    ) {
      siteDispatch({ type: 'SET', data: siteQueryResponse?.data })
    }
  }, [siteQueryResponse, siteDispatch, sitename, site?.sitename])

  // --------------------------------
  // Get immersion data
  // --------------------------------
  const immersionQueryResponse = useImmersionMap()

  useEffect(() => {
    if (
      !immersionQueryResponse?.isPending &&
      !immersionQueryResponse?.isError
    ) {
      // addResourceBundle will not replace the labels if the object is empty (i.e. a site has no labels).
      // To prevent labels from one site carrying over to a site with no labels we must clear the resource
      if (JSON.stringify(immersionQueryResponse?.data) === '{}') {
        i18next.removeResourceBundle('language', 'translation')
      } else {
        i18next.addResourceBundle(
          'language',
          'translation',
          immersionQueryResponse?.data,
        )
      }
    }
  }, [immersionQueryResponse])

  useEffect(() => {
    // If on a site that doesn't have the immersion feature
    // then make sure it is turned off (i.e. switch back to English)
    if (isUUID(site?.id) && !site?.checkForEnabledFeature(IMMERSION)) {
      i18next.changeLanguage('en')
    }
  }, [site])

  return {
    siteQueryResponse,
  }
}

export default SiteData

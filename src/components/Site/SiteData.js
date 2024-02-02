import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import i18next from 'i18next'

// FPCC
import { useImmersionMap } from 'common/dataHooks/useImmersionLabels'
import { useSite } from 'common/dataHooks/useSites'
import { useSiteDispatch, useSiteStore } from 'context/SiteContext'
import { IMMERSION } from 'common/constants'
import { isUUID } from 'common/utils/stringHelpers'

function SiteData() {
  const navigate = useNavigate()
  const siteDispatch = useSiteDispatch()
  const { sitename } = useParams()

  // --------------------------------
  // Get Language Site data
  // --------------------------------
  const { isInitialLoading, error, data } = useSite() // site data request, to put in the site store
  const { site } = useSiteStore() // site store, to validate when it is ready for use

  useEffect(() => {
    if (isInitialLoading === false && error === null) {
      siteDispatch({ type: 'SET', data })
    }
    if (error) {
      navigate(
        `/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [error, isInitialLoading, sitename])

  // --------------------------------
  // Get immersion data
  // --------------------------------
  const {
    isLoading: immersionIsLoading,
    error: immersionError,
    data: immersionData,
  } = useImmersionMap()

  useEffect(() => {
    if (
      immersionData &&
      immersionIsLoading === false &&
      immersionError === null
    ) {
      // addResourceBundle will not replace the labels if the object is empty (i.e. a site has no labels).
      // To prevent labels from one site carrying over to a site with no labels we must clear the resource
      if (JSON.stringify(immersionData) === '{}') {
        i18next.removeResourceBundle('language', 'translation')
      } else i18next.addResourceBundle('language', 'translation', immersionData)
    }
  }, [immersionIsLoading, immersionError, immersionData])

  useEffect(() => {
    // If on a site that doesn't have the immersion feature
    // then make sure it is turned off (i.e. switch back to English)
    if (isUUID(site?.id) && !site?.checkForEnabledFeature(IMMERSION)) {
      i18next.changeLanguage('en')
    }
  }, [site])

  return {
    siteLoading: isInitialLoading || site?.id?.length < 1,
  }
}

export default SiteData

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import i18next from 'i18next'

// FPCC
import { useImmersionMap } from 'common/dataHooks/useImmersionLabels'
import { useSite } from 'common/dataHooks/useSites'
import { useSiteDispatch, useSiteStore } from 'context/SiteContext'

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
  }, [data, error, isInitialLoading, navigate, siteDispatch, sitename])

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
      i18next.addResourceBundle('language', 'translation', immersionData)
    }
  }, [immersionIsLoading, immersionError, immersionData])

  return {
    siteLoading: isInitialLoading || site?.id?.length < 1,
  }
}

export default SiteData

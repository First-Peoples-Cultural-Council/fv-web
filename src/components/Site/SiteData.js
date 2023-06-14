import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import i18next from 'i18next'

// FPCC
import api from 'services/api'
import { useSiteDispatch } from 'context/SiteContext'
// import useSite from 'common/dataHooks/useSite'
import useImmersion from 'common/dataHooks/useImmersion'

function SiteData() {
  const navigate = useNavigate()
  const siteDispatch = useSiteDispatch()
  const { sitename } = useParams()

  // --------------------------------
  // Get Language Site data
  // --------------------------------
  const { isLoading, error, data } = useQuery(
    ['site', sitename],
    () => api.site.get(sitename),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  useEffect(() => {
    if (isLoading === false && error === null) {
      siteDispatch({ type: 'SET', data })
    }
    if (error) {
      navigate(
        `/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [sitename, isLoading, error])

  // --------------------------------
  // Get immersion data
  // --------------------------------
  const {
    isLoading: immersionIsLoading,
    error: immersionError,
    data: immersionData,
  } = useImmersion()

  useEffect(() => {
    if (
      immersionData &&
      immersionIsLoading === false &&
      immersionError === null
    ) {
      let translations = {}
      const ids = {}
      immersionData?.results?.forEach((label) => {
        const output = updateLabels(
          label?.id,
          label?.label,
          label?.labelPath,
          translations,
          ids,
        )
        translations = output?.locales
      })
      i18next.addResourceBundle('language', 'translation', translations)
    }
  }, [immersionIsLoading, immersionError, immersionData])

  return {
    siteLoading: isLoading || data?.uid?.length < 1,
  }
}

function updateLabels(id, label, labelPath, locales, ids) {
  let translationTargetRef = locales || {}
  let idsTargetRef = ids
  const path = labelPath.split('.')

  path.slice(0, -1).forEach((step) => {
    if (!translationTargetRef[step]) {
      translationTargetRef[step] = {}
      idsTargetRef[step] = {}
    }
    translationTargetRef = translationTargetRef[step]
    idsTargetRef = idsTargetRef[step]
  })
  translationTargetRef[path[path.length - 1]] = label
  idsTargetRef[path[path.length - 1]] = id

  return {
    locales,
    ids,
  }
}

export default SiteData

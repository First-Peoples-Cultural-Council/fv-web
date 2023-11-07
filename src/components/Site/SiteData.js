import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import i18next from 'i18next'

// FPCC
import { useImmersion } from 'common/dataHooks/useImmersion'
import { useSite } from 'common/dataHooks/useSites'
import { useSiteDispatch, useSiteStore } from 'context/SiteContext'

function SiteData() {
  const navigate = useNavigate()
  const siteDispatch = useSiteDispatch()
  const { sitename } = useParams()

  // --------------------------------
  // Get Language Site data
  // --------------------------------
  const { isLoading, error, data } = useSite() // site data request, to put in the site store
  const { site } = useSiteStore() // site store, to validate when it is ready for use

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
    siteLoading: isLoading || site?.id?.length < 1,
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

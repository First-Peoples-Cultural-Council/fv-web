import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import immersionDataAdaptor from 'components/Immersion/immersionDataAdaptor'

function DashboardImmersionData() {
  const { site } = useSiteStore()
  const { sitename, children, uid } = site
  const navigate = useNavigate()
  const [labelDictionaryId, setLabelDictionaryId] = useState(null)

  useEffect(() => {
    if (children?.['Label Dictionary'])
      setLabelDictionaryId(children['Label Dictionary'])
  }, [children])

  const { isLoading, error, isError, data } = useQuery(
    ['immersion', uid],
    () => api.immersion.get(labelDictionaryId),
    {
      // The query will not execute until the labelDictionaryId exists
      enabled: !!labelDictionaryId,
    },
  )

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const tileContent = []

  const headerContent = {
    title: 'Immersion',
    subtitle: 'Update the labels used in immersion mode on your site.',
    icon: 'Translate',
    iconColor: 'tertiaryA',
  }

  return {
    headerContent,
    isLoading: isLoading || isError,
    site,
    tileContent,
    labels: immersionDataAdaptor(data) || [],
  }
}

export default DashboardImmersionData

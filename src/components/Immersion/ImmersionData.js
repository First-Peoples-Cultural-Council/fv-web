import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import immersionDataAdaptor from 'components/Immersion/immersionDataAdaptor'

function ImmersionData() {
  const { site } = useSiteStore()
  const { title, children, sitename, uid } = site
  const navigate = useNavigate()
  const [labelDictionaryId, setLabelDictionaryId] = useState(null)

  useEffect(() => {
    if (children && children?.['Label Dictionary'])
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

  return {
    isLoading: !title,
    isLoadingEntries: isLoading || isError,
    items: data?.entries?.length > 0 ? immersionDataAdaptor(data) : [],
    actions: ['copy'],
  }
}

export default ImmersionData

import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function DashboardAlphabetData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Data fetch
  const { data, isLoading, error, isError } = useQuery(
    ['alphabet', site?.uid],
    () => api.alphabet.get(site?.uid),
    {
      enabled: !!site?.uid,
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
    title: 'Alphabet',
    subtitle: 'Update media and linked content for your alphabet characters.',
    icon: 'Alphabet',
  }

  return {
    headerContent,
    isLoading: isLoading || isError,
    site,
    sitename,
    tileContent,
    characters: data?.id ? data?.characters : [],
  }
}

export default DashboardAlphabetData

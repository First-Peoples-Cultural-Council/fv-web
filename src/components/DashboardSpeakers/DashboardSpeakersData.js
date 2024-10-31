import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePeople } from 'common/dataHooks/usePeople'

function DashboardSpeakersData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  const { data, error, isError, isInitialLoading } = usePeople()

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const tileContent = [
    {
      icon: 'Create',
      name: 'Add a Speaker',
      description: 'Add a new speaker to your site',
      href: `/${sitename}/dashboard/create/speaker`,
      iconColor: 'blumine-800',
    },
  ]

  const headerContent = {
    title: 'Speakers',
    subtitle: `View the contributing speakers for the ${site?.title} site`,
    icon: 'Speak',
  }

  return {
    headerContent,
    tileContent,
    isLoading: isInitialLoading || isError,
    site,
    sitename,
    speakers: data?.results || [],
  }
}

export default DashboardSpeakersData

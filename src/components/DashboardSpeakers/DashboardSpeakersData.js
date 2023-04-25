import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function DashboardSpeakersData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  const { data, error, isError, isLoading } = useQuery(
    ['speakers', site?.uid],
    () => api.speaker.getAll({ siteId: site?.uid }),
    {
      // The query will not execute until the uid exists
      enabled: !!site?.uid,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
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

  const tileContent = [
    {
      icon: 'Create',
      name: 'Add a Speaker',
      description: 'Add a new speaker to your site',
      href: `/${sitename}/dashboard/create/speaker`,
      iconColor: 'wordText',
    },
  ]

  const headerContent = {
    title: 'Speakers',
    subtitle: `View the contributing speakers for the ${site?.title} site`,
    icon: 'Speak',
  }

  const speakersDataAdaptor = (dataArray) => {
    const speakersData = []
    dataArray.forEach((speaker) => {
      speakersData.push({
        id: speaker?.uid,
        name: speaker?.properties?.['dc:title'],
        bio: speaker?.properties?.['dc:description'],
        speaker,
      })
    })
    return speakersData
  }

  return {
    headerContent,
    tileContent,
    isLoading: isLoading || isError,
    site,
    sitename,
    speakers:
      data?.entries?.length > 0 ? speakersDataAdaptor(data.entries) : [],
  }
}

export default DashboardSpeakersData

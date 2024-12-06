import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePeople } from 'common/dataHooks/usePeople'

function DashboardSpeakersData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  const peopleQueryResponse = usePeople()

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
    peopleQueryResponse,
    site,
    sitename,
    speakers: peopleQueryResponse?.data?.results || [],
  }
}

export default DashboardSpeakersData

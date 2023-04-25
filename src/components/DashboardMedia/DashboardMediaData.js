import { useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { getFvDocType } from 'common/stringHelpers'

function DashboardMediaData() {
  const { site } = useSiteStore()
  const [searchParams] = useSearchParams()

  const docType = searchParams.get('type')
    ? getFvDocType(searchParams.get('type'))
    : null

  const tileContent = [
    {
      icon: 'Microphone',
      name: 'Audio',
      description: 'Manage your audio files',
      href: 'browser?type=audio',
      iconColor: 'songText',
    },
    {
      icon: 'Images',
      name: 'Images',
      description: 'Manage your images',
      href: 'browser?type=images',
      iconColor: 'wordText',
    },
    {
      icon: 'Video',
      name: 'Videos',
      description: 'Manage your videos',
      href: 'browser?type=videos',
      iconColor: 'storyText',
    },
  ]
  const headerContent = {
    title: 'Media',
    subtitle: 'Manage the audio, images, and videos used on your site.',
    icon: 'Microphone',
  }

  return {
    headerContent,
    site,
    tileContent,
    docType,
  }
}

export default DashboardMediaData

import { useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function DashboardMediaData() {
  const { site } = useSiteStore()
  const [searchParams] = useSearchParams()

  const docType = searchParams.get('types') || null

  const tileContent = [
    {
      icon: 'Microphone',
      name: 'Audio',
      description: 'Manage your audio files',
      href: 'browser?types=audio',
      iconColor: 'songText',
    },
    {
      icon: 'Images',
      name: 'Images',
      description: 'Manage your images',
      href: 'browser?types=image',
      iconColor: 'wordText',
    },
    {
      icon: 'Video',
      name: 'Videos',
      description: 'Manage your videos',
      href: 'browser?types=video',
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

import { useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  TYPE_AUDIO,
  TYPE_IMAGE,
  TYPE_VIDEO,
  TYPES,
} from 'common/constants/searchParams'

function DashboardMediaData() {
  const { site } = useSiteStore()
  const [searchParams] = useSearchParams()

  const docType = searchParams.get(`${TYPES}`) || null

  const tileContent = [
    {
      icon: 'Microphone',
      name: 'Audio',
      description: 'Manage your audio files',
      href: `browser?${TYPES}=${TYPE_AUDIO}`,
      iconColor: 'songText',
    },
    {
      icon: 'Images',
      name: 'Images',
      description: 'Manage your images',
      href: `browser?${TYPES}=${TYPE_IMAGE}`,
      iconColor: 'wordText',
    },
    {
      icon: 'Video',
      name: 'Videos',
      description: 'Manage your videos',
      href: `browser?${TYPES}=${TYPE_VIDEO}`,
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

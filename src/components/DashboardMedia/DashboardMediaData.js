// FPCC
import { useSiteStore } from 'context/SiteContext'

function DashboardMediaData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      icon: 'Microphone',
      name: 'Audio',
      description: 'Manage your audio files',
      href: 'audio',
      iconColor: 'scarlet-900',
    },
    {
      icon: 'Images',
      name: 'Images',
      description: 'Manage your images',
      href: 'images',
      iconColor: 'blumine-800',
    },
    {
      icon: 'Video',
      name: 'Videos',
      description: 'Manage your videos',
      href: 'videos',
      iconColor: 'ochre-800',
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
  }
}

export default DashboardMediaData

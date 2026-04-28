// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  AUDIO_PATH,
  DOCUMENT_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
  SHARED_IMAGES_PATH,
} from 'common/constants'

function DashboardMediaData() {
  const { site } = useSiteStore()

  const tileContent = [
    {
      id: 'audio-gallery',
      icon: 'Microphone',
      name: 'Audio',
      description: 'Manage your audio files',
      href: AUDIO_PATH,
      iconColor: 'scarlet-900',
    },
    {
      id: 'image-gallery',
      icon: 'Images',
      name: 'Images',
      description: 'Manage your images',
      href: IMAGE_PATH,
      iconColor: 'blumine-800',
    },
    {
      id: 'video-gallery',
      icon: 'Video',
      name: 'Videos',
      description: 'Manage your videos',
      href: VIDEO_PATH,
      iconColor: 'ochre-800',
    },
    {
      id: 'documents-gallery',
      icon: 'Reports',
      name: 'Documents',
      description: 'Manage your pdfs, csvs, and text files.',
      href: DOCUMENT_PATH,
      iconColor: 'jade-800',
    },
    {
      id: 'shared-image-gallery',
      icon: 'Images',
      name: 'Shared images',
      description: 'Browse images provided by FirstVoices.',
      href: SHARED_IMAGES_PATH,
      iconColor: 'charcoal-500',
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

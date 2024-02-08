import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useGalleries } from 'common/dataHooks/useGalleries'
import { LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardGalleriesData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch

  const { data, isInitialLoading } = useGalleries()

  const tileContent = [
    {
      icon: 'Create',
      name: 'Create a Gallery',
      description: 'Add a new image gallery to your site',
      href: `/${sitename}/dashboard/create/gallery`,
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
    },
  ]

  const headerContent = {
    title: 'Galleries',
    subtitle: 'Edit the galleries on your site',
    icon: 'Images',
  }

  return {
    headerContent,
    isLoading: isInitialLoading,
    site,
    tileContent,
    galleries: data?.results || [],
  }
}

export default DashboardGalleriesData

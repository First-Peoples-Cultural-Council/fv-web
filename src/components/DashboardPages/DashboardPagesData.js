import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import usePages from 'common/dataHooks/usePages'

function DashboardPagesData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Data fetch
  const { data, error, isError, isInitialLoading } = usePages()

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
      icon: 'Home',
      name: 'Edit Homepage',
      description: 'Edit the main homepage for your site',
      href: `/${sitename}/dashboard/edit/home`,
      iconColor: 'wordText',
      auth: 'Admin',
    },
    {
      icon: 'Create',
      name: 'Create a Custom Page',
      description: 'Add a new page to your site',
      href: `/${sitename}/dashboard/create/page`,
      iconColor: 'wordText',
      auth: 'Admin',
    },
  ]

  const headerContent = {
    title: 'Pages',
    subtitle: 'Edit your site homepage and manage custom pages.',
    icon: 'WebPages',
  }

  return {
    headerContent,
    isLoading: isInitialLoading || isError,
    site,
    sitename,
    tileContent,
    customPages: data?.results?.length > 0 ? data?.results : [],
  }
}

export default DashboardPagesData

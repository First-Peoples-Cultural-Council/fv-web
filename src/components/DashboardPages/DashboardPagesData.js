import { useParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePages } from 'common/dataHooks/usePages'
import { LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardPagesData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const queryResponse = usePages()

  const tileContent = [
    {
      icon: 'Home',
      name: 'Edit Homepage',
      description: 'Edit the main homepage for your site',
      href: `/${sitename}/dashboard/edit/home`,
      iconColor: 'ochre-800',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Create',
      name: 'Create a Custom Page',
      description: 'Add a new page to your site',
      href: `/${sitename}/dashboard/create/page`,
      iconColor: 'blumine-800',
      auth: LANGUAGE_ADMIN,
    },
  ]

  const headerContent = {
    title: 'Pages',
    subtitle: 'Edit your site homepage and manage custom pages.',
    icon: 'WebPages',
  }

  return {
    queryResponse,
    headerContent,
    site,
    tileContent,
  }
}

export default DashboardPagesData

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { useUserStore } from 'context/UserContext'
import { useSiteStore } from 'context/SiteContext'

function DashboardData() {
  const { user } = useUserStore()
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // --------------------------------
  // Get user sites
  // --------------------------------
  const {
    data: userSitesData,
    isLoading: userSitesIsLoading,
    error: userSitesError,
  } = useQuery(['userSites', user?.id], () => api.user.getMySites())

  useEffect(() => {
    if (user && userSitesIsLoading === false && userSitesError === null) {
      const defaultSite = userSitesData?.[0] ? userSitesData?.[0] : null
      const isMember = !!(user?.roles?.[sitename] || user?.isSuperAdmin)
      if (!sitename || !isMember) {
        window.location.href = `/${defaultSite?.sitename}/dashboard`
      }
    }
  }, [user, userSitesIsLoading, userSitesError])

  const { roles, isSuperAdmin } = user

  const currentUser = {
    ...user,
    isAdmin: !!(roles?.[sitename] === 'Admin' || isSuperAdmin),
    role: `${site?.title} ${roles?.[sitename] ? roles?.[sitename] : ''}`,
    sites: userSitesData,
  }

  const homeTiles = [
    {
      icon: 'Widget',
      name: 'Create a Widget',
      description: "Add a new Widget to your site's collection",
      href: 'create/widget',
      iconColor: 'wordText',
      auth: 'Admin',
    },
    {
      icon: 'WebPages',
      name: 'Custom Pages',
      description: 'Manage all custom pages on your site',
      href: 'edit/pages',
      iconColor: 'phraseText',
      auth: 'Admin',
    },
    {
      icon: 'Home',
      name: 'Edit Your Homepage',
      description: 'Edit the main homepage for your site',
      href: 'edit/home',
      iconColor: 'wordText',
      auth: 'Admin',
    },
    {
      icon: 'QuestionCircleSolid',
      name: 'Support',
      description:
        'Ask a question or find out how to do something on FirstVoices',
      href: 'https://firstvoices.atlassian.net/servicedesk/customer/portals',
      iconColor: 'songText',
      auth: 'Member',
      externalLink: true,
    },
  ]

  return {
    currentUser,
    site,
    homeTiles,
    isLoading: userSitesIsLoading || !site,
  }
}

export default DashboardData

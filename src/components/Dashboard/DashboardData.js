import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { useUserStore } from 'context/UserContext'
import { useSiteStore } from 'context/SiteContext'
import { LANGUAGE_ADMIN, MEMBER } from 'common/constants/roles'

function DashboardData() {
  const { user } = useUserStore()
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // --------------------------------
  // Get user sites
  // --------------------------------
  const {
    data: userSitesData,
    isInitialLoading: userSitesIsLoading,
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

  const { roles } = user

  const currentUser = {
    ...user,
    isAdmin: user?.isLanguageAdmin,
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
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'WebPages',
      name: 'Custom Pages',
      description: 'Manage all custom pages on your site',
      href: 'edit/pages',
      iconColor: 'phraseText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'Home',
      name: 'Edit Your Homepage',
      description: 'Edit the main homepage for your site',
      href: 'edit/home',
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
    },
    {
      icon: 'QuestionCircleSolid',
      name: 'Support',
      description:
        'Ask a question or find out how to do something on FirstVoices',
      href: 'https://firstvoices.atlassian.net/servicedesk/customer/portals',
      iconColor: 'songText',
      auth: MEMBER,
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

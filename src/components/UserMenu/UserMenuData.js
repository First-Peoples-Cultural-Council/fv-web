// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { atLeastAssistant } from 'common/constants/roles'

function UserMenuData() {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const { login, logout } = useLoginLogout()

  const getDashboardLink = () => {
    if (!user?.isTeam) return null
    const userSiteRole = user?.roles?.[site?.sitename] || ''
    if (userSiteRole.match(atLeastAssistant) || user?.isStaff) {
      return `/${site?.sitename}/dashboard`
    }
    const siteToUse = getFirstSiteWIthTeamAccess(user?.roles)
    return `/${siteToUse}/dashboard`
  }

  const getFirstSiteWIthTeamAccess = (roles) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(roles)) {
      if (value.match(atLeastAssistant)) return key
    }
    return ''
  }

  const dashboardLink = getDashboardLink()

  return {
    currentUser: { ...user, dashboardLink },
    hasImmersion: site?.features?.includes('immersion'),
    login,
    logout,
  }
}

export default UserMenuData

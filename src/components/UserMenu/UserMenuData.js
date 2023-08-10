// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'

function UserMenuData() {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const { login, logout } = useLoginLogout

  return {
    currentUser: user,
    hasImmersion: site?.features?.includes('immersion'),
    login,
    logout,
  }
}

export default UserMenuData

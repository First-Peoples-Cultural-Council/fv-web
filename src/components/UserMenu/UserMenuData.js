// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'

function UserMenuData() {
  const { site } = useSiteStore()
  const { user } = useUserStore()

  return {
    currentUser: user,
    hasImmersion: site?.features?.includes('immersion'),
  }
}

export default UserMenuData

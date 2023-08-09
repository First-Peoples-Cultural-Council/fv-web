import { useAuth } from 'react-oidc-context'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'

function UserMenuData() {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const auth = useAuth()

  function logout(e) {
    e.preventDefault()
    auth.removeUser()
    auth.signoutRedirect()
  }

  function login(e) {
    e.preventDefault()
    auth.signinRedirect()
  }

  return {
    currentUser: user,
    hasImmersion: site?.features?.includes('immersion'),
    login,
    logout,
  }
}

export default UserMenuData

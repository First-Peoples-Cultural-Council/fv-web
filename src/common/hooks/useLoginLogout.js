import { useAuth } from 'react-oidc-context'

// FPCC
import { ORIGINAL_DESTINATION } from 'common/constants'
import GlobalConfiguration from 'src/GlobalConfiguration'

export default function useLoginLogout() {
  const auth = useAuth()

  function saveOriginalLocation() {
    window.sessionStorage.setItem(
      ORIGINAL_DESTINATION,
      window.location.toString(),
    )
  }

  function logout(e) {
    e?.preventDefault()
    auth.removeUser()
    window.location.href = GlobalConfiguration.END_SESSION_URL
  }

  function login(e) {
    e?.preventDefault()
    saveOriginalLocation()
    auth.signinRedirect()
  }

  return {
    login,
    logout,
  }
}

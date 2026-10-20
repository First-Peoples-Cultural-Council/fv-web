import { useAuth } from 'react-oidc-context'

// FPCC
import { ORIGINAL_DESTINATION } from 'common/constants'
import GlobalConfiguration from 'src/GlobalConfiguration'

export default function useLoginLogout() {
  const auth = useAuth()

  function saveOriginalLocation(destination) {
    window.sessionStorage.setItem(
      ORIGINAL_DESTINATION,
      destination ||
        window.location.pathname +
          window.location.search +
          window.location.hash,
    )
  }

  function logout(e) {
    e?.preventDefault()
    auth.removeUser()
    window.location.href = GlobalConfiguration.END_SESSION_URL
  }
  // destination is optional, defaults to the current page
  function login(e, destination) {
    e?.preventDefault()
    saveOriginalLocation(destination)
    auth.signinRedirect()
  }

  return {
    login,
    logout,
  }
}

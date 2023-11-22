import { useAuth } from 'react-oidc-context'

// FPCC
import { ORIGINAL_DESTINATION } from 'common/constants'

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
    saveOriginalLocation()
    auth.signoutRedirect()
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

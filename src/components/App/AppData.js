import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'

// FPCC
import { useUserDispatch } from 'context/UserContext'
import { useMySites } from 'common/dataHooks/useMySites'
import { useSites } from 'common/dataHooks/useSites'
import useLoginLogout from 'common/hooks/useLoginLogout'

function AppData() {
  const userDispatch = useUserDispatch()
  const auth = useAuth()
  const { logout } = useLoginLogout()

  const {
    isInitialLoading: userRolesIsLoading,
    error: userRolesError,
    mySitesData,
  } = useMySites()

  const sites = useSites()

  function features(site) {
    return site.enabledFeatures.find(
      (feature) => feature.key.toLowerCase() === 'has_app',
    )
  }
  const hasApp = sites?.data?.results?.filter(features)

  useEffect(() => {
    if (auth.isLoading === false && !auth.error) {
      if (auth.user?.expired) {
        // remove expired token and try again
        auth.removeUser()
        window.location.reload()
      }
      if (userRolesIsLoading === false && userRolesError === null) {
        userDispatch({
          type: 'SET',
          data: { auth, memberships: mySitesData },
        })
      }
    }
    if (auth.isLoading === false && auth.error) {
      // invalid token (edge case, can happen when switching auth providers)
      // remove token and try again
      auth.removeUser()
      window.location.reload()
    }
    if (userRolesIsLoading === false && userRolesError) {
      // 401 error from server (edge case since we support anon users, can happen due to misconfiguration)
      if (userRolesError?.response?.status === 401) {
        // don't just remove the token; sign the user out so they can try signing in again
        logout()
      }
    }
  }, [
    auth.isLoading,
    auth.error,
    auth.user?.expired,
    userRolesIsLoading,
    userRolesError,
  ])

  return {
    appIsLoading: auth.isLoading,
    hasApp,
  }
}

export default AppData

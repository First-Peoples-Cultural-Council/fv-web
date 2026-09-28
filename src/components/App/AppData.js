import { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'

// FPCC
import { useUserDispatch } from 'context/UserContext'
import { useMySites } from 'common/dataHooks/useMySites'
import useLoginLogout from 'common/hooks/useLoginLogout'

function AppData() {
  const userDispatch = useUserDispatch()
  const auth = useAuth()
  const { logout } = useLoginLogout()

  // which auth.isAuthenticated value UserContext currently reflects -
  // NavBar reads UserContext, not auth directly, so we hold the loading
  // gate open until the dispatch below has actually landed
  const [syncedIsAuthenticated, setSyncedIsAuthenticated] = useState(false)

  const mySitesQueryResponse = useMySites()

  useEffect(() => {
    if (!mySitesQueryResponse?.isPending && !auth?.error) {
      if (!mySitesQueryResponse?.isError) {
        // Set Auth/User and user sites in context store
        userDispatch({
          type: 'SET',
          data: { auth, memberships: mySitesQueryResponse?.data },
        })
      }
      // Handle 401 error from server (edge case since we support anon users, can happen due to misconfiguration)
      if (
        mySitesQueryResponse?.isError &&
        mySitesQueryResponse?.response?.status === 401
      ) {
        // Don't just remove the token; sign the user out so they can try signing in again
        logout()
      }
      setSyncedIsAuthenticated(auth?.isAuthenticated)
    }
  }, [mySitesQueryResponse, auth, userDispatch, logout])

  useEffect(() => {
    if (auth?.user?.expired || auth?.error) {
      // In addition to checking for expired tokem, checking for error covers invalid token (edge case, can happen when switching auth providers)
      // Remove token and try again
      auth.removeUser()
      window.location.reload()
    }
  }, [auth])

  return {
    appIsLoading:
      mySitesQueryResponse?.isPending ||
      auth?.isLoading ||
      syncedIsAuthenticated !== auth?.isAuthenticated,
  }
}

export default AppData

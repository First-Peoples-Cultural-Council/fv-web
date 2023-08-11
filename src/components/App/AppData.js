import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'

// FPCC
import { useUserDispatch } from 'context/UserContext'
import { useMySites } from 'common/dataHooks/useMySites'

function AppData() {
  const userDispatch = useUserDispatch()
  const auth = useAuth()

  const {
    isInitialLoading: userRolesIsLoading,
    error: userRolesError,
    mySitesData,
  } = useMySites()

  useEffect(() => {
    if (
      (auth.isLoading === false && !auth.error) ||
      (userRolesIsLoading === false && userRolesError === null)
    ) {
      userDispatch({
        type: 'SET',
        data: { profile: auth?.user?.profile, memberships: mySitesData },
      })
    }
  }, [auth.isLoading, auth.error, userRolesIsLoading, userRolesError])

  return {
    appIsLoading: auth.isLoading,
  }
}

export default AppData

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from 'react-oidc-context'

// FPCC
import { useUserDispatch } from 'context/UserContext'
import api from 'services/api'

function AppData() {
  const userDispatch = useUserDispatch()
  const auth = useAuth()

  const {
    isInitialLoading: userRolesIsLoading,
    error: userRolesError,
    data: userRolesData,
  } = useQuery(['userRoles'], () => api.user.getRoles())

  useEffect(() => {
    if (
      auth.isLoading === false &&
      !auth.error &&
      userRolesIsLoading === false &&
      userRolesError === null
    ) {
      userDispatch({
        type: 'SET',
        data: { profile: auth?.user?.profile, roles: userRolesData },
      })
    }
  }, [auth.isLoading, auth.error, userRolesIsLoading, userRolesError])

  return {
    appIsLoading: auth.isLoading,
  }
}

export default AppData

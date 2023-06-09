import { useEffect } from 'react'
import { useQuery } from 'react-query'

// FPCC
import { useUserDispatch } from 'context/UserContext'
import api from 'services/api'

function AppData() {
  const userDispatch = useUserDispatch()

  const {
    isLoading: userIsLoading,
    error: userError,
    data: userData,
  } = useQuery('user', () => api.user.get(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const {
    isLoading: userRolesIsLoading,
    error: userRolesError,
    data: userRolesData,
  } = useQuery('userRoles', () => api.user.getRoles(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  useEffect(() => {
    if (
      userIsLoading === false &&
      userError === null &&
      userRolesIsLoading === false &&
      userRolesError === null
    ) {
      userDispatch({ type: 'SET', data: { ...userData, roles: userRolesData } })
    }
  }, [userIsLoading, userRolesIsLoading, userRolesError, userError])

  return {
    appIsLoading: !userData?.id,
  }
}

export default AppData

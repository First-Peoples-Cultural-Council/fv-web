import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'

// FPCC
import { useUserDispatch } from 'context/UserContext'
import { useMySites } from 'common/dataHooks/useMySites'
import useLoginLogout from 'common/hooks/useLoginLogout'
// import whiteFavicon from 'assets/favicons/favicon-white-32x32.png'
// import blackFavicon from 'assets/favicons/favicon-black-32x32.png'

function AppData() {
  const userDispatch = useUserDispatch()
  const auth = useAuth()
  const { logout } = useLoginLogout()

  // console.log({whiteFavicon})

  // const setFavicon = () => {
  //   let favicon = document.querySelector('link[rel="icon"]')
  //   if (!favicon) {
  //     favicon = document.createElement('favicon')
  //     favicon.rel = 'icon'
  //     document.head.appendChild(favicon)
  //   }
  //   favicon.href = window.matchMedia('(prefers-color-scheme: dark)').matches
  //     ? whiteFavicon
  //     : blackFavicon
  // }

  // window
  //   .matchMedia('(prefers-color-scheme: dark)')
  //   .addEventListener('change', setFavicon);

  // setFavicon()

  const {
    isInitialLoading: userRolesIsLoading,
    error: userRolesError,
    mySitesData,
  } = useMySites()

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
  }
}

export default AppData

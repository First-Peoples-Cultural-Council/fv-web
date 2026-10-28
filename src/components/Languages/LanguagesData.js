import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useIsFetching } from '@tanstack/react-query'

// FPCC
import { useLanguages } from 'common/dataHooks/useLanguages'
import { useUserStore } from 'context/UserContext'
import { JOIN_SITE, MY_SITES } from 'common/constants'
import { atLeastMember } from 'common/constants/roles'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function LanguagesData() {
  const { user } = useUserStore()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [siteToJoin, , removeSiteToJoin] = useSearchParamsState({
    searchParamName: JOIN_SITE,
    defaultValue: '',
  })

  const languagesQueryResponse = useLanguages({
    query,
    explorable: true,
  })

  // user.sites is out of date until my-sites is refetched after sign in
  const mySitesReady = useIsFetching({ queryKey: [MY_SITES] }) === 0
  const joinedSite = mySitesReady
    ? user?.sites?.find(
        (site) =>
          site?.sitename === siteToJoin && atLeastMember.test(site?.role),
      )
    : null

  useEffect(() => {
    if (joinedSite) {
      navigate(`/${joinedSite.sitename}/`, { replace: true })
    }
  }, [joinedSite, navigate])

  return {
    languagesQueryResponse,
    user,
    siteToJoin: mySitesReady && !joinedSite ? siteToJoin : '',
    removeSiteToJoin,
  }
}

export default LanguagesData

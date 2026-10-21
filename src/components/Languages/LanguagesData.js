import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import { useLanguages } from 'common/dataHooks/useLanguages'
import { useMySites } from 'common/dataHooks/useMySites'
import { useUserStore } from 'context/UserContext'
import { JOIN_SITE } from 'common/constants'
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

  // my-sites is refetched after sign in, wait for it before checking membership
  const { data: mySites, isSuccess, isFetching } = useMySites()
  const mySitesReady = isSuccess && !isFetching
  const joinedSite = mySitesReady
    ? mySites?.find(
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

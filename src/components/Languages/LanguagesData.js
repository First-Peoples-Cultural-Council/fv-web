import { useSearchParams } from 'react-router-dom'

// FPCC
import { useLanguages } from 'common/dataHooks/useLanguages'
import { useMySites } from 'common/dataHooks/useMySites'
import { useUserStore } from 'context/UserContext'

function LanguagesData() {
  const { user } = useUserStore()

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const { languagesData, isInitialLoading } = useLanguages({
    query,
  })

  const { mySitesData, isInitialLoading: mySitesIsInitialLoading } =
    useMySites()

  return {
    isLoading: isInitialLoading || mySitesIsInitialLoading,
    // sites
    allSitesList: languagesData,
    // mySites
    userSitesList: mySitesData,
    user,
  }
}

export default LanguagesData

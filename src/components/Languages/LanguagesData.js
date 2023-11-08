// FPCC
import { useSites } from 'common/dataHooks/useSites'
import { useMySites } from 'common/dataHooks/useMySites'
import { useUserStore } from 'context/UserContext'

function LanguagesData() {
  const { user } = useUserStore()
  const { allSitesData, isInitialLoading } = useSites()

  const { mySitesData, isInitialLoading: mySitesIsInitialLoading } =
    useMySites()

  return {
    isLoading: isInitialLoading || mySitesIsInitialLoading,
    // sites
    allSitesList: allSitesData,
    // mySites
    userSitesList: mySitesData,
    user,
  }
}

export default LanguagesData

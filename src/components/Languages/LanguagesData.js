// FPCC
import { useSites } from 'common/dataHooks/useSites'
import { useMySites } from 'common/dataHooks/useMySites'
import { parentLanguageColors } from 'assets/parentLanguageColors'

function LanguagesData() {
  const { allSitesData, isInitialLoading } = useSites()

  const { mySitesData, isInitialLoading: mySitesIsInitialLoading } =
    useMySites()

  return {
    isLoading: isInitialLoading || mySitesIsInitialLoading,
    // sites
    allSitesList: allSitesData,
    // mySites
    userSitesList: mySitesData,
    parentLanguagesData: parentLanguageColors,
  }
}

export default LanguagesData

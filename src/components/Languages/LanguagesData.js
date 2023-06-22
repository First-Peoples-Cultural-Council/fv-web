// import { useQuery } from 'react-query'

// FPCC
// import api from 'services/api'
import useSites from 'common/dataHooks/useSites'
import useMySites from 'common/dataHooks/useMySites'
import { parentLanguageColors } from 'assets/parentLanguageColors'

function LanguagesData() {
  const { allSitesData } = useSites()

  const { mySitesData } = useMySites()

  return {
    // sites
    allSitesList: allSitesData,
    // mySites
    userSitesList: mySitesData,
    parentLanguagesData: parentLanguageColors,
  }
}

export default LanguagesData

// import { useQuery } from 'react-query'

// FPCC
// import api from 'services/api'
import useSites from 'common/dataHooks/useSites'
import useMySites from 'common/dataHooks/useMySites'
import { parentLanguageColors } from 'assets/parentLanguageColors'

function LanguagesData() {
  const { allSitesData } = useSites()

  const { mySitesData } = useMySites()

  // console.log({parentLanguageColors})

  // const { data: parentLanguagesResponse } = useQuery(
  //   ['parentLanguagesData'],
  //   () => api.directory.get({ directoryName: 'parent_languages' }),
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //   },
  // )

  // const parentLanguagesDataAdapter = (parentLanguagesEntries) => {
  //   const output = {}

  //   parentLanguagesEntries?.entries.forEach((entry) => {
  //     output[entry?.id] = entry?.properties.color
  //       .toLowerCase()
  //       .replace(/\s/g, '')
  //   })
  //   console.log({output})
  //   return output
  // }
  // parentLanguagesDataAdapter(parentLanguagesResponse)

  return {
    // sites
    allSitesList: allSitesData,
    // mySites
    userSitesList: mySitesData,
    parentLanguagesData: parentLanguageColors,
  }
}

export default LanguagesData

import { useQuery } from 'react-query'

// FPCC
import api from 'services/api'
import useSites from 'common/dataHooks/useSites'
import useMySites from 'common/dataHooks/useMySites'

function LanguagesData() {
  const { allSitesData } = useSites()

  const { mySitesData } = useMySites()

  const { data: parentLanguagesResponse } = useQuery(
    ['parentLanguagesData'],
    () => api.directory.get({ directoryName: 'parent_languages' }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const parentLanguagesDataAdapter = (parentLanguagesEntries) => {
    const output = {}

    parentLanguagesEntries?.entries.forEach((entry) => {
      output[entry?.id] = entry?.properties.color
        .toLowerCase()
        .replace(/\s/g, '')
    })

    return output
  }

  return {
    // sites
    allSitesList: allSitesData,
    // mySites
    userSitesList: mySitesData,
    parentLanguagesData: parentLanguagesDataAdapter(parentLanguagesResponse),
  }
}

export default LanguagesData

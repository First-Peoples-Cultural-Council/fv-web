import { useQuery } from 'react-query'

// FPCC
import api from 'services/api'
import useSites from 'common/dataHooks/useSites'
import useMySites from 'common/dataHooks/useMySites'

function LanguagesData() {
  // const { user } = useUserStore()

  // Fetching data for all sites, user's sites and colors for parent languages
  const { allSitesData } = useSites()

  const { mySitesData } = useMySites()

  // const { data: userSitesResponse } = useQuery(
  //   ['userSites', user?.id],
  //   () => api.user.getMySites(),
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //   },
  // )

  const { data: parentLanguagesResponse } = useQuery(
    ['parentLanguagesData'],
    () => api.directory.get({ directoryName: 'parent_languages' }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  // const languageSitesDataAdapter = ({ siteList, isAllSitesList }) => {
  //   let siteListMapped = siteList?.map((site) => getFormattedSiteObject(site))

  //   // For the allSites list, filter out non-version2 sites
  //   if (isAllSitesList) {
  //     siteListMapped = siteListMapped?.filter((site) =>
  //       site?.features?.includes('version2'),
  //     )
  //   }

  //   return categorizeAndSort(siteListMapped)
  // }

  // const getFormattedSiteObject = (site) => ({
  //   uid: site?.uid,
  //   title: site?.title,
  //   sitename: site?.sitename,
  //   visibility: site?.visibility,
  //   logoPath: site?.logoId
  //     ? getMediaUrl({ id: site.logoId, type: 'image', viewName: 'Thumbnail' })
  //     : placeholder,
  //   parentLanguageTitle: site?.parentLanguageTitle,
  //   features: site?.features,
  // })

  // const categorizeAndSort = (siteList) => {
  //   // Categorization based on the parent language
  //   const categorizedSiteList = {}
  //   siteList?.forEach((mappedSite) => {
  //     const newSite = { ...mappedSite }
  //     newSite.parentLanguageTitle =
  //       mappedSite.parentLanguageTitle || OTHER_LANGUAGES_DESCRIPTOR
  //     if (!categorizedSiteList?.[newSite.parentLanguageTitle]) {
  //       categorizedSiteList[newSite.parentLanguageTitle] = []
  //     }
  //     categorizedSiteList[newSite.parentLanguageTitle].push(newSite)
  //   })

  //   // Sort the languasoges in alphabetical order of their parent languages
  //   let ordered = {}

  //   if (categorizedSiteList) {
  //     ordered = Object.keys(categorizedSiteList)
  //       .sort((a, b) => a - b)
  //       .reduce((obj, key) => {
  //         const newObj = { ...obj }
  //         newObj[key] = categorizedSiteList[key]
  //         return newObj
  //       }, {})
  //   }

  //   // Pushing 'Other Languages...' to last of the list
  //   const tempOtherLanguages = ordered[OTHER_LANGUAGES_DESCRIPTOR]
  //   if (tempOtherLanguages) {
  //     delete ordered[OTHER_LANGUAGES_DESCRIPTOR]
  //     const pairToAdd = { [OTHER_LANGUAGES_DESCRIPTOR]: tempOtherLanguages }
  //     return { ...ordered, ...pairToAdd }
  //   }

  //   return ordered
  // }

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

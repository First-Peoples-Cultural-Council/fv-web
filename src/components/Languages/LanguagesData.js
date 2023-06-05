import { useQuery } from 'react-query'

// FPCC
import api from 'services/api'
import { getMediaUrl } from 'common/utils/urlHelpers'
import { useUserStore } from 'context/UserContext'
import placeholder from 'images/cover-thumbnail.png'
import useSites from 'common/dataHooks/useSites'

const OTHER_LANGUAGES_DESCRIPTOR = 'Other FirstVoices Language Sites'

function LanguagesData() {
  const { user } = useUserStore()

  // Fetching data for all sites, user's sites and colors for parent languages
  const { data: allSitesResponse } = useSites()

  const { data: userSitesResponse } = useQuery(
    ['userSites', user?.id],
    () => api.user.getMySites(),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const languageSitesDataAdapter = ({ siteList, isAllSitesList }) => {
    let siteListMapped = siteList?.map((site) => getFormattedSiteObject(site))

    // For the allSites list, filter out non-version2 sites
    if (isAllSitesList) {
      siteListMapped = siteListMapped?.filter((site) =>
        site?.features?.includes('version2'),
      )
    }

    return categorizeAndSort(siteListMapped)
  }

  const getFormattedSiteObject = (site) => ({
    uid: site?.uid,
    title: site?.title,
    sitename: site?.sitename,
    visibility: site?.visibility,
    logoPath: site?.logoId
      ? getMediaUrl({ id: site.logoId, type: 'image', viewName: 'Thumbnail' })
      : placeholder,
    parentLanguageTitle: site?.parentLanguageTitle,
    features: site?.features,
  })

  const categorizeAndSort = (siteList) => {
    // Categorization based on the parent language
    const categorizedSiteList = {}
    siteList?.forEach((mappedSite) => {
      const newSite = { ...mappedSite }
      newSite.parentLanguageTitle =
        mappedSite.parentLanguageTitle || OTHER_LANGUAGES_DESCRIPTOR
      if (!categorizedSiteList?.[newSite.parentLanguageTitle]) {
        categorizedSiteList[newSite.parentLanguageTitle] = []
      }
      categorizedSiteList[newSite.parentLanguageTitle].push(newSite)
    })

    // Sort the languasoges in alphabetical order of their parent languages
    let ordered = {}

    if (categorizedSiteList) {
      ordered = Object.keys(categorizedSiteList)
        .sort()
        .reduce((obj, key) => {
          const newObj = { ...obj }
          newObj[key] = categorizedSiteList[key]
          return newObj
        }, {})
    }

    // Pushing 'Other Languages...' to last of the list
    const tempOtherLanguages = ordered[OTHER_LANGUAGES_DESCRIPTOR]
    if (tempOtherLanguages) {
      delete ordered[OTHER_LANGUAGES_DESCRIPTOR]
      const pairToAdd = { [OTHER_LANGUAGES_DESCRIPTOR]: tempOtherLanguages }
      return { ...ordered, ...pairToAdd }
    }

    return ordered
  }

  return {
    // sites
    allSitesList: allSitesResponse,
    // mySites
    userSitesList: languageSitesDataAdapter({
      siteList: userSitesResponse,
      isAllSitesList: false,
    }),
  }
}

export default LanguagesData

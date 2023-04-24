import { useQuery } from 'react-query'

// FPCC
import api from 'services/api'
import { getMediaUrl } from 'common/urlHelpers'
import { useUserStore } from 'context/UserContext'
import placeholder from 'images/cover-thumbnail.png'

const OTHER_LANGUAGES_DESCRIPTOR = 'Other FirstVoices Language Sites'

function LanguagesData() {
  const { user } = useUserStore()

  // Fetching data for all sites, user's sites and colors for parent languages
  const { data: allSitesResponse } = useQuery(['languages'], () => api.site.getSites(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { data: userSitesResponse } = useQuery(['userSites', user?.id], () => api.user.getMySites(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { data: parentLanguagesResponse } = useQuery(
    ['parentLanguagesData'],
    () => api.directory.get({ directoryName: 'parent_languages' }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const languageSitesDataAdapter = ({ siteList, isAllSitesList }) => {
    let siteListMapped = siteList?.map((site) => {
      return getFormattedSiteObject(site)
    })

    // For the allSites list, filter out non-version2 sites
    if (isAllSitesList) {
      siteListMapped = siteListMapped?.filter((site) => {
        return site?.features?.includes('version2')
      })
    }

    return categorizeAndSort(siteListMapped)
  }

  const getFormattedSiteObject = (site) => {
    return {
      uid: site?.uid,
      title: site?.title,
      sitename: site?.sitename,
      visibility: site?.visibility,
      logoPath: site?.logoId ? getMediaUrl({ id: site.logoId, type: 'image', viewName: 'Thumbnail' }) : placeholder,
      parentLanguageTitle: site?.parentLanguageTitle,
      features: site?.features,
    }
  }

  const categorizeAndSort = (siteList) => {
    // Categorization based on the parent language
    const categorizedSiteList = {}
    siteList?.forEach((mappedSite) => {
      mappedSite.parentLanguageTitle = mappedSite.parentLanguageTitle || OTHER_LANGUAGES_DESCRIPTOR
      if (!categorizedSiteList?.[mappedSite.parentLanguageTitle]) {
        categorizedSiteList[mappedSite.parentLanguageTitle] = []
      }
      categorizedSiteList[mappedSite.parentLanguageTitle].push(mappedSite)
    })

    // Sort the languasoges in alphabetical order of their parent languages
    let ordered = {}

    if (categorizedSiteList) {
      ordered = Object.keys(categorizedSiteList)
        .sort()
        .reduce((obj, key) => {
          obj[key] = categorizedSiteList[key]
          return obj
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

  const parentLanguagesDataAdapter = (parentLanguagesEntries) => {
    const output = {}

    parentLanguagesEntries?.entries.forEach((entry) => {
      output[entry?.id] = entry?.properties.color.toLowerCase().replace(/\s/g, '')
    })

    return output
  }

  return {
    allSitesList: languageSitesDataAdapter({ siteList: allSitesResponse, isAllSitesList: true }),
    userSitesList: languageSitesDataAdapter({ siteList: userSitesResponse, isAllSitesList: false }),
    parentLanguagesData: parentLanguagesDataAdapter(parentLanguagesResponse),
  }
}

export default LanguagesData

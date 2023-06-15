import { useQuery } from 'react-query'

// FPCC
import { SITES } from 'common/constants'
import api from 'services/api'
import placeholder from 'images/cover-thumbnail.png'

export default function useSites() {
  const allSitesResponse = useQuery([SITES], () => api.site.getSites())
  const formattedSitesData = allSitesResponse?.data?.map((parentLanguage) => ({
    language: parentLanguage?.language,
    sites: parentLanguage?.sites.map((site) => ({
      uid: site?.id,
      title: site?.title,
      sitename: site?.slug,
      visibility: site?.visibility?.toLowerCase(),
      logoPath: site?.logo?.content || placeholder,
      parentLanguageTitle: site?.language,
      features: site?.features,
    })),
  }))
  // console.log({ allSitesResponse })
  // const userSitesResponse = useQuery([MY_SITES], () => api.site.mySites())
  // console.log({ userSitesResponse })
  // const formattedUserSitesData = userSitesResponse?.data?.map((site) => ({
  //   uid: site?.id,
  //   title: site?.title,
  //   sitename: site?.slug,
  //   visibility: site?.visibility?.toLowerCase(),
  //   logoPath: site?.logo?.content || placeholder,
  //   parentLanguageTitle: site?.language,
  //   features: site?.features,
  // }))
  // console.log({ formattedUserSitesData })
  return {
    // ...allSitesResponse,
    allSitesData: formattedSitesData,
    // ...userSitesResponse,
    // userSitesList: formattedUserSitesData,
  }
}

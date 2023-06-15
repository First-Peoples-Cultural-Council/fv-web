import { useQuery } from 'react-query'

// FPCC
import { MY_SITES } from 'common/constants'
import api from 'services/api'
import placeholder from 'images/cover-thumbnail.png'

export default function useMySites() {
  const userSitesResponse = useQuery([MY_SITES], () => api.site.mySites())
  //   console.log({ userSitesResponse })
  const formattedUserSitesData = userSitesResponse?.data?.map((site) => ({
    uid: site?.id,
    title: site?.title,
    sitename: site?.slug,
    visibility: site?.visibility?.toLowerCase(),
    logoPath: site?.logo?.content || placeholder,
    parentLanguageTitle: site?.language,
    features: site?.features,
  }))
  //   console.log({ formattedUserSitesData })
  return {
    // ...userSitesResponse,
    mySitesData: formattedUserSitesData,
  }
}

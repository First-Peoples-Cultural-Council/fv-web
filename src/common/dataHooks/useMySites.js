import { useQuery } from 'react-query'

// FPCC
import { MY_SITES } from 'common/constants'
import api from 'services/api'
import placeholder from 'images/cover-thumbnail.png'

export default function useMySites() {
  const userSitesResponse = useQuery([MY_SITES], () => api.site.mySites())
  const formattedUserSitesData = userSitesResponse?.data?.results?.map((site) => ({
    uid: site?.id,
    title: site?.title,
    sitename: site?.slug,
    visibility: site?.visibility?.toLowerCase(),
    logoPath: site?.logo?.content || placeholder,
    parentLanguageTitle: site?.language,
    features: site?.features,
    role: site?.role,
  }))
  return {
    ...userSitesResponse,
    mySitesData: formattedUserSitesData,
  }
}

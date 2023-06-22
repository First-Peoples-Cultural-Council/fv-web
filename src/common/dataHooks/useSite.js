import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { SITES, PUBLIC, MEMBERS, TEAM } from 'common/constants'
import api from 'services/api'
import placeholder from 'images/cover-thumbnail.png'

export default function useSite() {
  const { sitename } = useParams()
  const response = useQuery(
    [SITES, sitename],
    () => api.site.get({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )

  const formattedSiteData = {
    path: response?.data?.url,
    uid: response?.data?.id,
    roles: [],
    children: {
      Alphabet: response?.data?.characters,
      Dictionary: response?.data?.dictionary,
      Categories: response?.data?.categories,
      Contributors: response?.data?.people,
    },
    menu: response?.data?.menu,
    title: response?.data?.title,
    sitename: response?.data?.slug,
    parentLanguageTitle: response?.data?.language,
    logoId: response?.data?.logo?.content || placeholder,
    topBackgroundImageId: response?.data?.bannerImage,
    topBackgroundVideoId: response?.data?.bannerVideo,
    joinText: null,
    hasContactUs: true,
    visibility: response?.data?.visibility?.toLowerCase(),
    visibilityOptions: constructVisibilityOptions(
      response?.data?.visibility?.toLowerCase(),
    ),
    features: response?.data?.features,
  }
  return { ...response, data: formattedSiteData }
}

const constructVisibilityOptions = (siteVisibility) => {
  const formattedVisibilityOptions = (optionsArray) =>
    optionsArray.map((option) => ({
      icon: option,
      value: option,
      transKey: `visibility.${option}`,
    }))
  switch (siteVisibility) {
    case PUBLIC:
      return formattedVisibilityOptions([TEAM, MEMBERS, PUBLIC])
    case MEMBERS:
      return formattedVisibilityOptions([TEAM, MEMBERS])
    case TEAM:
    default:
      return formattedVisibilityOptions([TEAM])
  }
}

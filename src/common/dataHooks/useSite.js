import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { widgetListAdaptor } from 'common/dataAdaptors'

import {
  SITES,
  PUBLIC,
  MEMBERS,
  TEAM,
  IMAGE,
  MEDIUM,
  SMALL,
  THUMBNAIL,
} from 'common/constants'
import api from 'services/api'
import { getMediaPath } from 'common/utils/mediaHelpers'

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
    logo: response?.data?.logo,
    logoPathMedium: response?.data?.logo
      ? getMediaPath({
          mediaObject: response?.data?.logo,
          type: IMAGE,
          size: MEDIUM,
        })
      : null,
    logoPathSmall: response?.data?.logo
      ? getMediaPath({
          mediaObject: response?.data?.logo,
          type: IMAGE,
          size: SMALL,
        })
      : null,
    logoPathThumbnail: response?.data?.logo
      ? getMediaPath({
          mediaObject: response?.data?.logo,
          type: IMAGE,
          size: THUMBNAIL,
        })
      : null,
    bannerImage: response?.data?.bannerImage,
    bannerVideo: response?.data?.bannerVideo,
    visibility: response?.data?.visibility?.toLowerCase(),
    visibilityOptions: constructVisibilityOptions(
      response?.data?.visibility?.toLowerCase(),
    ),
    features: response?.data?.features,
    homepageWidgets: widgetListAdaptor(response?.data?.homepage),
    // The following are missing from the current API response - to be added at a later date
    joinText: null,
    hasContactUs: true,
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

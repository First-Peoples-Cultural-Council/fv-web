// FPCC
import {
  PUBLIC,
  MEMBERS,
  TEAM,
  IMAGE,
  MEDIUM,
  SMALL,
  THUMBNAIL,
} from 'common/constants'
import { widgetListAdaptor } from 'common/dataAdaptors/widgetAdaptors'
import {
  getMediaPath,
  selectOneMediaDataHelper,
} from 'common/utils/mediaHelpers'

export function languagesListAdaptor({ languagesData }) {
  return languagesData?.map((language) => ({
    language: language?.language,
    languageCode: language?.languageCode,
    sites: sitesListAdaptor({ sitesData: language?.sites }),
  }))
}

export function sitesListAdaptor({ sitesData }) {
  return sitesData?.map((site) => ({
    id: site?.id,
    title: site?.title,
    sitename: site?.slug,
    visibility: site?.visibility?.toLowerCase(),
    ...logoAdaptor({ item: site }),
    parentLanguageTitle: site?.language,
    features: site?.features,
    role: site?.role, // Data for this will only be included in the my-sites response
  }))
}

export function siteAdaptor({ siteData }) {
  const videoObj = siteData.bannerVideo
  const imageObj = siteData.bannerImage
  const banner = selectOneMediaDataHelper(imageObj, videoObj)
  return {
    banner,
    path: siteData?.url,
    id: siteData?.id,
    roles: [],
    children: {
      Alphabet: siteData?.characters,
      Dictionary: siteData?.dictionary,
      Categories: siteData?.categories,
      Contributors: siteData?.people,
    },
    menu: siteData?.menu,
    title: siteData?.title,
    sitename: siteData?.slug,
    parentLanguageTitle: siteData?.language,
    ...logoAdaptor({ item: siteData }),
    bannerImage: siteData?.bannerImage,
    bannerVideo: siteData?.bannerVideo,
    visibility: siteData?.visibility?.toLowerCase(),
    visibilityOptions: constructVisibilityOptions(siteData?.visibility),
    features: siteData?.features,
    homepageWidgets: widgetListAdaptor({
      widgetList: siteData?.homepage,
      sitename: siteData?.slug,
    }),
    // The following are missing from the current API response - to be added at a later date
    joinText: null,
    hasContactUs: true,
  }
}

const constructVisibilityOptions = (siteVisibility) => {
  const formattedVisibilityOptions = (optionsArray) =>
    optionsArray.map((option) => ({
      icon: option,
      value: option,
      transKey: `visibility.${option?.toLowerCase()}`,
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

const logoAdaptor = ({ item }) => {
  const logoObject = {
    logo: item?.logo,
    logoId: item?.logo?.id,
    logoPathMedium: item?.logo
      ? getMediaPath({
          mediaObject: item?.logo,
          type: IMAGE,
          size: MEDIUM,
        })
      : null,
    logoPathSmall: item?.logo
      ? getMediaPath({
          mediaObject: item?.logo,
          type: IMAGE,
          size: SMALL,
        })
      : null,
    logoPathThumbnail: item?.logo
      ? getMediaPath({
          mediaObject: item?.logo,
          type: IMAGE,
          size: THUMBNAIL,
        })
      : null,
  }
  return logoObject
}

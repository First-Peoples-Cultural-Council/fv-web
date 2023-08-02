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
import { getMediaPath } from 'common/utils/mediaHelpers'
import placeholder from 'images/cover-thumbnail.png'

export function sitesListAdaptor({ sitesData }) {
  return sitesData?.map((language) => ({
    language: language?.language,
    languageCode: language?.languageCode,
    sites: language?.sites.map((site) => ({
      uid: site?.id,
      title: site?.title,
      sitename: site?.slug,
      visibility: site?.visibility?.toLowerCase(),
      logoPath: site?.logo?.small?.path || placeholder,
      parentLanguageTitle: site?.language,
      features: site?.features,
    })),
  }))
}

export function siteAdaptor({ siteData }) {
  return {
    path: siteData?.url,
    uid: siteData?.id,
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
    logo: siteData?.logo,
    logoPathMedium: siteData?.logo
      ? getMediaPath({
          mediaObject: siteData?.logo,
          type: IMAGE,
          size: MEDIUM,
        })
      : null,
    logoPathSmall: siteData?.logo
      ? getMediaPath({
          mediaObject: siteData?.logo,
          type: IMAGE,
          size: SMALL,
        })
      : null,
    logoPathThumbnail: siteData?.logo
      ? getMediaPath({
          mediaObject: siteData?.logo,
          type: IMAGE,
          size: THUMBNAIL,
        })
      : null,
    bannerImage: siteData?.bannerImage,
    bannerVideo: siteData?.bannerVideo,
    visibility: siteData?.visibility?.toLowerCase(),
    visibilityOptions: constructVisibilityOptions(
      siteData?.visibility?.toLowerCase(),
    ),
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

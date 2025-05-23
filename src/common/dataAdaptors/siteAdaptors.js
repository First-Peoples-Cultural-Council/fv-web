// FPCC
import { PUBLIC, MEMBERS, TEAM } from 'common/constants'
import { widgetListAdaptor } from 'common/dataAdaptors/widgetAdaptors'
import { selectOneMediaDataHelper } from 'common/utils/mediaHelpers'

export function languagesListAdaptor({ languagesData }) {
  return languagesData?.results?.map((language) => ({
    id: language?.id,
    title: language?.language,
    languageCode: language?.languageCode,
    sites: sitesListAdaptor({ sitesData: language?.sites }),
    noLanguageAssigned: language?.noLanguageAssigned,
  }))
}

export function sitesListAdaptor({ sitesData }) {
  return sitesData?.map((site) => ({
    id: site?.id,
    title: site?.title,
    sitename: site?.slug,
    visibility: site?.visibility,
    ...logoAdaptor({ item: site }),
    parentLanguageTitle: site?.language,
    features: site?.enabledFeatures,
    role: site?.role, // Data for this will only be included in the my-sites response
  }))
}

export function siteAdaptor({ siteData }) {
  const bannerVideo = siteData?.bannerVideo
  const bannerImage = siteData?.bannerImage
  const banner = selectOneMediaDataHelper(bannerImage, bannerVideo)
  return {
    banner,
    path: siteData?.url,
    id: siteData?.id,
    roles: [],
    menu: siteData?.menu,
    title: siteData?.title,
    sitename: siteData?.slug,
    parentLanguageTitle: siteData?.language,
    ...logoAdaptor({ item: siteData }),
    bannerImage,
    bannerVideo,
    visibility: siteData?.visibility,
    visibilityOptions: constructVisibilityOptions(siteData?.visibility),
    features: siteData?.enabledFeatures,
    homepageWidgets: widgetListAdaptor({
      widgetList: siteData?.homepage,
      sitename: siteData?.slug,
    }),
    checkForEnabledFeature: (featureKey) => {
      const feature = siteData?.enabledFeatures?.find(
        (e) => e?.key === featureKey,
      )
      return feature?.isEnabled || false
    },
    // The following are missing from the current API response - to be added at a later date
    joinText: null,
    hasContactUs: true,
  }
}

export const formattedVisibilityOptions = (optionsArray) =>
  optionsArray.map((option) => ({
    icon: option,
    value: option,
    label: option,
  }))

const constructVisibilityOptions = (siteVisibility) => {
  switch (siteVisibility) {
    case PUBLIC:
      return formattedVisibilityOptions([PUBLIC, MEMBERS, TEAM])
    case MEMBERS:
      return formattedVisibilityOptions([MEMBERS, TEAM])
    case TEAM:
    default:
      return formattedVisibilityOptions([TEAM])
  }
}

const logoAdaptor = ({ item }) => {
  const logoObject = {
    logo: item?.logo,
    logoId: item?.logo?.id,
    logoArray: item?.logo?.id ? [item?.logo] : [],
  }
  return logoObject
}

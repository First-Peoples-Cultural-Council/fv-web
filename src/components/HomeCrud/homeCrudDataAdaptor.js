import { IMAGE, VIDEO } from 'common/constants'

export const homeCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  const formattedData = {
    id: data?.id,
    logoId: data?.logo?.id,
    bannerImageId: data?.bannerImage?.id,
    bannerVideoId: data?.bannerVideo?.id,
    banner: {},
  }

  if (formattedData?.bannerImage) {
    formattedData.banner.docId = formattedData?.bannerImage?.id
    formattedData.banner.docType = IMAGE
  } else if (formattedData?.bannerVideo) {
    formattedData.banner.docId = formattedData?.bannerVideo?.id
    formattedData.banner.docType = VIDEO
  }
  return formattedData
}

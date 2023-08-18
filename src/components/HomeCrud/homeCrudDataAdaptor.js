import { IMAGE, VIDEO } from 'common/constants'

export const homeCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  const formattedData = {
    id: data?.uid,
    logoId: data?.logo?.id,
    bannerImage: data?.bannerImage,
    bannerVideo: data?.bannerVideo,
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

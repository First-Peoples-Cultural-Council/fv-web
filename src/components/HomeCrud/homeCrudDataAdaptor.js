import { DOC_IMAGE, DOC_VIDEO } from 'common/constants'

const homeCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  const formattedData = {
    id: data?.uid,
    logoId: data?.logoId,
    topBackgroundImageId: data?.topBackgroundImageId,
    topBackgroundVideoId: data?.topBackgroundVideoId,
    banner: {},
  }

  if (formattedData?.topBackgroundImageId) {
    formattedData.banner.docId = formattedData?.topBackgroundImageId
    formattedData.banner.docType = DOC_IMAGE
  } else if (formattedData?.topBackgroundVideoId) {
    formattedData.banner.docId = formattedData?.topBackgroundVideoId
    formattedData.banner.docType = DOC_VIDEO
  }

  return formattedData
}

export default homeCrudDataAdaptor

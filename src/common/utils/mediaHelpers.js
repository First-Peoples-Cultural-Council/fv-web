import { DOC_IMAGE, DOC_VIDEO } from 'common/constants'

export const selectOneFormHelper = (formData, mediaObjectkey) => {
  // Helper function to be used where a choice between
  // an image or video is given to add to a form

  // Accepts formData along with the following 3 params
  // mediaObjectkey: key representing the control value for field which contains docId and docType

  const docType = formData?.[mediaObjectkey]?.docType
  switch (docType) {
    case DOC_IMAGE:
      return { imageId: formData?.[mediaObjectkey]?.docId, videoId: '' }
    case DOC_VIDEO:
      return { imageId: '', videoId: formData?.[mediaObjectkey]?.docId }
    default:
      return { imageId: '', videoId: '' }
  }
}

export const selectOneDataHelper = (imageArray, videoArray) => {
  // allow for array of media objects or array of media ids
  if (imageArray?.length && (imageArray?.[0]?.uid || imageArray?.[0])) {
    return {
      docId: imageArray?.[0]?.uid || imageArray?.[0],
      docType: DOC_IMAGE,
    }
  }
  if (videoArray?.length && (videoArray?.[0]?.uid || videoArray?.[0])) {
    return {
      docId: videoArray?.[0]?.uid || videoArray?.[0],
      docType: DOC_VIDEO,
    }
  }
  return {}
}

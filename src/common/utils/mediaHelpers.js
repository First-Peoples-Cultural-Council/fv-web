import {
  DOC_IMAGE,
  DOC_VIDEO,
  AUDIO,
  VIDEO,
  IMAGE,
  ORIGINAL,
  SMALL,
  MEDIUM,
  THUMBNAIL,
} from 'common/constants'
// NB ALL sizes supplied for VIDEO or images of mime-type 'gif' will return a static image src except for ORIGINAL
export const getMediaPath = ({ mediaObject, type, size = ORIGINAL }) => {
  if (!mediaObject?.original) {
    return "A media object with the property of 'originl' must be supplied to retrieve a src path."
  }
  if (![ORIGINAL, SMALL, MEDIUM, THUMBNAIL].includes(size)) {
    return 'Only ORIGINAL, SMALL, MEDIUM, or THUMBNAIL are accepted as sizes for media.'
  }
  switch (type) {
    case AUDIO:
      return mediaObject?.original?.path

    case VIDEO:
    case IMAGE:
      return mediaObject?.[size]?.path

    default:
      return 'The media type supplied is not recognised by the getMediaPath helper'
  }
}

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

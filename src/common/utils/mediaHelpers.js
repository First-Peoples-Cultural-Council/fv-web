import {
  IMAGE,
  VIDEO,
  VIDEO_LINK,
  AUDIO,
  ORIGINAL,
  SMALL,
  MEDIUM,
  THUMBNAIL,
  DISPLAYABLE_PROPS_MEDIA,
} from 'common/constants'
// NB ALL sizes supplied for VIDEO or images of mime-type 'gif' will return a static image src except for ORIGINAL
export const getMediaPath = ({ mediaObject, type, size = ORIGINAL }) => {
  if (!mediaObject?.original) {
    return `${type} object with the property of 'original' must be supplied to retrieve a src path.`
  }
  if (![ORIGINAL, SMALL, MEDIUM, THUMBNAIL].includes(size)) {
    return 'Only ORIGINAL, SMALL, MEDIUM, or THUMBNAIL are accepted as sizes for media.'
  }
  switch (type) {
    case AUDIO:
      return mediaObject?.original?.path
    case VIDEO:
      return mediaObject?.[size]?.path
    case IMAGE:
      return mediaObject?.[size]?.path || mediaObject?.original?.path

    default:
      return 'The media type supplied is not recognised by the getMediaPath helper'
  }
}

export const getReadableFileSize = (size) =>
  `${(size / (1024 * 1024)).toFixed(2)} MB`

export const isDisplayablePropMedia = (property, value) =>
  (typeof value === 'string' || value instanceof String) &&
  DISPLAYABLE_PROPS_MEDIA.includes(property)

export const selectOneMediaFormHelper = (formMediaObject) => {
  // Helper function to be used where a choice between
  // an image or video is given to add to a form
  // Accepts an object with the properties docId and docType

  const docType = formMediaObject?.docType
  switch (docType) {
    case IMAGE:
      return { imageId: formMediaObject?.docId, videoId: '' }
    case VIDEO:
      return { imageId: '', videoId: formMediaObject?.docId }
    default:
      return { imageId: '', videoId: '' }
  }
}

export const selectOneMediaDataHelper = (imageObj, videoObj) => {
  // allow for either image or video
  if (imageObj?.id) {
    return {
      docId: imageObj?.id,
      docType: IMAGE,
    }
  }
  if (videoObj?.id) {
    return {
      docId: videoObj?.id,
      docType: VIDEO,
    }
  }
  return {}
}

export const selectCoverMedia = (
  imageArray,
  videoArray,
  relatedVideoLinksArray,
) => {
  // allow for array of media objects or array of media ids
  if (imageArray?.length && imageArray?.[0]) {
    return {
      entry: imageArray?.[0],
      type: IMAGE,
    }
  }
  if (videoArray?.length && videoArray?.[0]) {
    return {
      entry: videoArray?.[0],
      type: VIDEO,
    }
  }
  if (relatedVideoLinksArray?.length && relatedVideoLinksArray?.[0]) {
    return {
      entry: relatedVideoLinksArray?.[0],
      type: VIDEO_LINK,
    }
  }
  return {}
}

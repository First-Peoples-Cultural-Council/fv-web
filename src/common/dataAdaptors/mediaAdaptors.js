import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

export const mediaAdaptor = ({ type, data }) => {
  if (!data) {
    return null
  }

  let formattedData = {
    id: data?.id,
    title: data?.title,
    description: data?.description,
    mimeType: data?.original?.mimetype,
    downloadLink: data?.original?.path,
    original: data?.original,
    acknowledgement: data?.acknowledgement,
  }

  if (type === IMAGE) {
    formattedData = {
      ...formattedData,
      height: data?.original?.height,
      width: data?.original?.width,
      thumbnail: data?.small?.path,
    }
  }

  if (type === VIDEO) {
    formattedData = {
      ...formattedData,
      height: data?.original?.height,
      width: data?.original?.width,
      thumbnail: data?.small?.path,
    }
  }

  if (type === AUDIO) {
    formattedData = {
      ...formattedData,
      speakers: data?.speakers,
    }
  }

  if ([AUDIO, IMAGE, VIDEO].includes(type)) {
    return formattedData
  }

  return { ...data, message: 'NOT a media document' }
}

export const mediaItemForEditing = ({ type, data }) => {
  const response = {
    ...mediaAdaptor({ type, data }),
    ...audienceForEditing({ item: data }),
  }

  response.speakerIds = objectsToIdsAdaptor(response?.speakers)

  return response
}

export const mediaItemForApi = ({ formData, mediaType }) => {
  const formattedEntry = {
    ...formData,
    ...audienceForApi({ item: formData }),
  }

  if (mediaType === AUDIO) {
    formattedEntry.speakers = formattedEntry.speakerIds
  }

  return formattedEntry
}

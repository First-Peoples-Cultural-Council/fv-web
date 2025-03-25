import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'
import { AUDIO, DOCUMENT, IMAGE, VIDEO } from 'common/constants'

export const mediaSearchAdaptor = ({ type, data }) => {
  switch (type) {
    case AUDIO:
    case DOCUMENT:
      return {
        ...data,
        mimeType: data?.original?.mimetype || '',
        downloadLink: data?.original?.path || '',
      }
    case VIDEO:
    case IMAGE:
      return {
        ...data,
        mimeType: data?.original?.mimetype || '',
        downloadLink: data?.original?.path || '',
        height: data?.original?.height,
        width: data?.original?.width,
      }
    default:
      return { ...data, message: 'NOT a media type' }
  }
}

const baseMediaAdaptor = ({ data }) => {
  const formattedData = {
    id: data?.id || '',
    title: data?.title || '',
    description: data?.description || '',
    original: data?.original || {},
    acknowledgement: data?.acknowledgement || '',
  }
  return formattedData
}

export const mediaItemForEditing = ({ data }) => {
  const formattedData = {
    ...baseMediaAdaptor({ data }),
    ...audienceForEditing({ item: data }),
    speakers: objectsToIdsAdaptor(data?.speakers),
  }

  return formattedData
}

export const mediaItemForApi = ({ formData }) => {
  const formattedEntry = {
    ...baseMediaAdaptor({ data: formData }),
    ...audienceForApi({ item: formData }),
    speakers: formData?.speakers || [],
  }

  return formattedEntry
}

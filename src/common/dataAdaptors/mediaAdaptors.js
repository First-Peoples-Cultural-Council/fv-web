import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
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
      acknowledgement: data?.acknowledgement,
    }
  }

  if ([AUDIO, IMAGE, VIDEO].includes(type)) {
    return formattedData
  }

  return { ...data, message: 'NOT a media document' }
}

export const entryForViewing = ({ type, data, flatListOfSpeakers = false }) => {
  const response = {
    ...mediaAdaptor({ type, data }),
    ...audienceForEditing({ item: data }),
  }

  if (flatListOfSpeakers) {
    const speakersFlatList = response?.speakers?.map((speaker) => speaker?.id)
    response.speakers = speakersFlatList
  }

  return response
}

export const entryForEditing = ({ formData }) => ({
  ...formData,
  ...audienceForApi({ item: formData }),
})

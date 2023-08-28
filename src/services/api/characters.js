import { apiBase } from 'services/config'
import { CHARACTERS, SITES } from 'common/constants'

const characters = {
  get: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${CHARACTERS}/${id}`).json(),
  partialUpdate: async ({ sitename, id, properties }) => {
    const body = {
      related_audio: properties?.relatedAudio,
      related_images: properties?.relatedImages,
      related_videos: properties?.relatedVideos,
      note: properties?.note,
      related_dictionary_entries: properties?.relatedDictionaryEntries,
    }
    return apiBase()
      .patch(`${SITES}/${sitename}/${CHARACTERS}/${id}`, { json: body })
      .json()
  },
  getAll: async ({ sitename }) =>
    apiBase().get(`${SITES}/${sitename}/${CHARACTERS}/`).json(),
}

export default characters

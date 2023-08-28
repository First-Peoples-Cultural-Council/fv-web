import GlobalConfiguration from 'src/GlobalConfiguration'
import { apiBase } from 'services/config'
import {
  SITES,
  AUDIO_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
  AUDIO,
} from 'common/constants'

const media = {
  get: async ({ sitename, docType, pageParam, perPage = 24 }) => {
    // Get list of media files of specified type for given site
    const response = await apiBase()
      .get(
        `${SITES}/${sitename}/${docType}/?page=${pageParam}&pageSize=${perPage}`,
      )
      .json()
    const lastPage = response?.previous
    const nextPage = response?.next
    return { ...response, nextPage, lastPage }
  },
  getAudio: async ({ sitename, id, headers }) =>
    apiBase()
      .extend(headers)
      .get(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`)
      .json(),
  getImage: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`).json(),
  getVideo: async ({ sitename, id }) =>
    apiBase().get(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`).json(),
  getMediaDocument: async ({ sitename, docId, docType }) =>
    apiBase().get(`${SITES}/${sitename}/${docType}/${docId}`).json(),
  getUploadEndpoint: (sitename, docType) =>
    `${GlobalConfiguration.API_URL}${SITES}/${sitename}/${docType}`,
  uploadAudio: async ({ sitename, data }) =>
    apiBase().post(`${SITES}/${sitename}/${AUDIO}`, { body: data }).json(),
}

export default media

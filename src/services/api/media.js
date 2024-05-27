import GlobalConfiguration from 'src/GlobalConfiguration'
import { apiBase } from 'services/config'
import { SITES, AUDIO_PATH, IMAGE_PATH, VIDEO_PATH } from 'common/constants'

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
  getUploadEndpoint: (sitename, docType) => {
    const url = new URL(
      `${SITES}/${sitename}/${docType}`,
      GlobalConfiguration.API_URL,
    )
    return url.href
  },
  uploadAudio: async ({ sitename, data }) =>
    apiBase().post(`${SITES}/${sitename}/${AUDIO_PATH}`, { body: data }).json(),
  deleteAudio: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`).json(),
  deleteImage: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`).json(),
  deleteVideo: async ({ sitename, id }) =>
    apiBase().delete(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`).json(),
  updateAudio: async ({ id, sitename, data }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${AUDIO_PATH}/${id}`, { json: data })
      .json(),
  updateImage: async ({ id, sitename, data }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${IMAGE_PATH}/${id}`, { json: data })
      .json(),
  updateVideo: async ({ id, sitename, data }) =>
    apiBase()
      .put(`${SITES}/${sitename}/${VIDEO_PATH}/${id}`, { json: data })
      .json(),
}

export default media
